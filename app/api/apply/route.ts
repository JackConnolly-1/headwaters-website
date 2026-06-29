import { NextResponse } from "next/server";
import { getServiceClient, BUCKET } from "@/lib/supabaseServer";
import { createApplicationRecord } from "@/lib/airtable";

// Receives the form fields + the storage paths of already-uploaded files,
// then creates the Airtable record (with the files attached by signed URL).
export async function POST(req: Request) {
  console.log("[api/apply] start");
  try {
    const body = await req.json();

    // Honeypot: real users never fill this hidden field; bots do.
    if (body.hp) {
      console.log("[api/apply] honeypot triggered — ignoring");
      return NextResponse.json({ ok: true });
    }

    const required = ["firstName", "lastName", "companyName", "email"];
    for (const k of required) {
      if (!body[k] || !String(body[k]).trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${k}` },
          { status: 400 }
        );
      }
    }

    const supabase = getServiceClient();
    const files = Array.isArray(body.files) ? body.files : [];
    const signed: Record<string, { url: string; filename: string }> = {};
    for (const file of files) {
      if (!file?.path) continue;
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(file.path, 3600); // 1h — long enough for Airtable to fetch
      if (error || !data) {
        console.log("[api/apply] signed-url error", error?.message);
        return NextResponse.json(
          { error: "Could not read an uploaded file" },
          { status: 500 }
        );
      }
      signed[file.field] = {
        url: data.signedUrl,
        filename: file.filename || "file",
      };
    }

    await createApplicationRecord({
      founderName: `${body.firstName} ${body.lastName}`.trim(),
      companyName: body.companyName,
      email: body.email,
      phone: body.phone,
      website: body.website,
      founded: body.founded,
      legalStructure: body.legalStructure,
      location: body.location,
      capitalRaised: body.capitalRaised,
      currentAsk: body.currentAsk,
      videoUrl: body.videoUrl,
      applicationFile: signed.application,
      pitchDeck: signed.deck,
    });

    console.log("[api/apply] done — record created");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log("[api/apply] error", (e as Error).message);
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}
