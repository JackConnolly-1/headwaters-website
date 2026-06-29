interface Attachment {
  url: string;
  filename: string;
}

export interface ApplicationFields {
  founderName: string;
  companyName: string;
  email: string;
  phone?: string;
  website?: string;
  founded?: string;
  legalStructure?: string;
  location?: string;
  capitalRaised?: string;
  currentAsk?: string;
  videoUrl?: string;
  applicationFile?: Attachment;
  pitchDeck?: Attachment;
}

// Creates one record in the "Founder Applications" table. Attachment fields are
// populated by URL — Airtable fetches each file and re-hosts it on the record.
export async function createApplicationRecord(f: ApplicationFields) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE;
  if (!token || !baseId || !table) {
    throw new Error("Airtable environment variables are missing");
  }

  const fields: Record<string, unknown> = {
    "Founder Name": f.founderName,
    "Company Name": f.companyName,
    Email: f.email,
  };
  if (f.phone) fields["Phone Number"] = f.phone;
  if (f.website) fields["Website"] = f.website;
  if (f.founded) fields["Founded"] = f.founded;
  if (f.legalStructure) fields["Legal Structure"] = f.legalStructure;
  if (f.location) fields["Location"] = f.location;
  if (f.capitalRaised) fields["Capital Raised to Date"] = f.capitalRaised;
  if (f.currentAsk) fields["Current Round Ask"] = f.currentAsk;
  if (f.videoUrl) fields["Video URL"] = f.videoUrl;
  if (f.applicationFile)
    fields["Application Form"] = [
      { url: f.applicationFile.url, filename: f.applicationFile.filename },
    ];
  if (f.pitchDeck)
    fields["Pitch Deck"] = [
      { url: f.pitchDeck.url, filename: f.pitchDeck.filename },
    ];

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields, typecast: true }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable error ${res.status}: ${text}`);
  }
  return res.json();
}
