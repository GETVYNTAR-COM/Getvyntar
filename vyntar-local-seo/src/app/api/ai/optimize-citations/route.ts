import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { clientId } = await req.json();

    if (!clientId) {
      return NextResponse.json(
        { error: "clientId is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Get client data
    const { data: client, error: clientError } = await supabaseAdmin
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Get all directories
    const { data: directories, error: dirError } = await supabaseAdmin
      .from("directories")
      .select("*")
      .order("domain_authority", { ascending: false });

    if (dirError || !directories) {
      return NextResponse.json(
        { error: "Failed to fetch directories" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a local SEO expert specialising in UK businesses.

A client has the following details:
- Business Name: ${client.business_name}
- Category: ${client.category}
- City: ${client.city}
- Postcode: ${client.postcode}

Here are the available directories:
${JSON.stringify(
  directories.map((d) => ({
    id: d.id,
    name: d.name,
    tier: d.tier,
    domain_authority: d.domain_authority,
    categories: d.categories,
    automation_level: d.automation_level,
    is_free: d.is_free,
    uk_only: d.uk_only,
  })),
  null,
  2
)}

Recommend the best directories for this business. Prioritise:
1. Tier 1 general directories (always include)
2. Category-specific directories matching "${client.category}"
3. Higher domain authority
4. Free directories first, then paid
5. UK-only directories for UK businesses

Return a JSON array of objects with: directory_id, name, priority (high/medium/low), reason (one sentence).
Return ONLY the JSON array, no other text.`,
        },
      ],
    });

    const content = message.content[0];
    const responseText = content.type === "text" ? content.text : "";

    let recommendations;
    try {
      recommendations = JSON.parse(responseText);
    } catch {
      recommendations = [];
    }

    return NextResponse.json({
      client: {
        id: client.id,
        business_name: client.business_name,
        category: client.category,
        city: client.city,
      },
      recommendations,
    });
  } catch (error) {
    console.error("Citation optimization error:", error);
    return NextResponse.json(
      { error: "Failed to optimize citations" },
      { status: 500 }
    );
  }
}
