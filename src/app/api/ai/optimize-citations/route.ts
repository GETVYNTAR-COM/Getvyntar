import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { error: "clientId is required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get client data
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Get all directories
    const { data: directories } = await supabase
      .from("directories")
      .select("*")
      .order("tier", { ascending: true });

    if (!directories || directories.length === 0) {
      return NextResponse.json(
        { error: "No directories found" },
        { status: 404 }
      );
    }

    // Call Claude API
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    if (!claudeApiKey) {
      return NextResponse.json(
        { error: "Claude API key not configured" },
        { status: 500 }
      );
    }

    const directoryList = directories
      .map(
        (d) =>
          `- ${d.name} (Tier ${d.tier}, DA: ${d.domain_authority}, Categories: ${d.categories?.join(", ")}, Automation: ${d.automation_level}, Free: ${d.is_free}, UK Only: ${d.uk_only})`
      )
      .join("\n");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are a UK local SEO expert. A client business needs citation recommendations.

Client Details:
- Business: ${client.business_name}
- Category: ${client.category}
- City: ${client.city}
- Current Citation Score: ${client.citation_score}

Available Directories:
${directoryList}

Recommend the top 15 directories for this ${client.category} business in ${client.city}. For each recommendation, explain why it's a good fit. Prioritize:
1. Tier 1 general directories (essential for all businesses)
2. Category-specific directories matching "${client.category}"
3. High domain authority directories
4. Free directories before paid ones

Return your response as JSON with this structure:
{
  "recommendations": [
    {
      "directory_name": "string",
      "priority": "high" | "medium" | "low",
      "reason": "string"
    }
  ],
  "strategy_notes": "string"
}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", errorText);
      return NextResponse.json(
        { error: "AI service error" },
        { status: 502 }
      );
    }

    const claudeResponse = await response.json();
    const content = claudeResponse.content[0]?.text || "";

    // Try to parse JSON from the response
    let recommendations;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: content };
    } catch {
      recommendations = { raw: content };
    }

    return NextResponse.json({
      client: {
        id: client.id,
        business_name: client.business_name,
        category: client.category,
        city: client.city,
      },
      ...recommendations,
    });
  } catch (error) {
    console.error("Optimize citations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
