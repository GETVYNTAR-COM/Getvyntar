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

    // Get citation data
    const { data: citations } = await supabase
      .from("citations")
      .select("*, directories(*)")
      .eq("client_id", clientId);

    const citationStats = {
      total: citations?.length || 0,
      live: citations?.filter((c) => c.status === "live").length || 0,
      pending: citations?.filter((c) => c.status === "pending").length || 0,
      failed: citations?.filter((c) => c.status === "failed").length || 0,
    };

    // Call Claude API
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    if (!claudeApiKey) {
      return NextResponse.json(
        { error: "Claude API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: `You are a UK local SEO expert writing a citation report for an agency client.

Client Details:
- Business: ${client.business_name}
- Category: ${client.category}
- City: ${client.city}
- Postcode: ${client.postcode}
- Citation Score: ${client.citation_score}/100

Citation Statistics:
- Total Citations: ${citationStats.total}
- Live: ${citationStats.live}
- Pending: ${citationStats.pending}
- Failed: ${citationStats.failed}

Generate a professional citation report with:
1. A brief executive summary (2-3 sentences)
2. Key insights about their current citation profile (3-4 bullet points)
3. Actionable recommendations to improve their local SEO (3-5 bullet points)

Return your response as JSON:
{
  "summary": "string",
  "insights": "string (use \\n for line breaks between points)",
  "recommendations": "string (use \\n for line breaks between points)"
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

    // Parse the JSON response
    let reportData;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      reportData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      reportData = {
        summary: content,
        insights: "",
        recommendations: "",
      };
    }

    if (!reportData) {
      return NextResponse.json(
        { error: "Failed to generate report" },
        { status: 500 }
      );
    }

    // Save report to database
    const { data: report, error: reportError } = await supabase
      .from("reports")
      .insert({
        client_id: clientId,
        report_type: "citation_audit",
        summary: reportData.summary,
        insights: reportData.insights,
        recommendations: reportData.recommendations,
      })
      .select()
      .single();

    if (reportError) {
      console.error("Report save error:", reportError);
      return NextResponse.json(
        { error: "Failed to save report" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      report: {
        id: report.id,
        created_at: report.created_at,
        client_id: report.client_id,
        report_type: report.report_type,
        summary: report.summary,
        insights: report.insights,
        recommendations: report.recommendations,
      },
      client: {
        business_name: client.business_name,
        category: client.category,
        city: client.city,
      },
      citation_stats: citationStats,
    });
  } catch (error) {
    console.error("Generate report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
