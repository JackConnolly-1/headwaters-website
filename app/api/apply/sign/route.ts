import { NextResponse } from "next/server";
import { getServiceClient, BUCKET } from "@/lib/supabaseServer";

// Returns short-lived signed upload URLs so the browser can upload files
// directly to Supabase Storage (bypassing the serverless request-size limit).
export async function POST(req: Request) {
  console.log("[api/apply/sign] start");
  try {
    const { files } = await req.json();
    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const folder = `submissions/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const uploads = [];
    for (const f of files) {
      const safe = String(f.name || "file")
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(-80);
      const path = `${folder}/${f.field}-${safe}`;
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(path);
      if (error || !data) {
        console.log("[api/apply/sign] sign error", error?.message);
        return NextResponse.json(
          { error: "Could not prepare upload" },
          { status: 500 }
        );
      }
      uploads.push({ field: f.field, path, token: data.token });
    }

    console.log("[api/apply/sign] done", uploads.length, "file(s)");
    return NextResponse.json({ uploads });
  } catch (e) {
    console.log("[api/apply/sign] error", (e as Error).message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
