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

    // Get citation data
    const { data: citations } = await supabaseAdmin
      .from("citations")
      .select("*, directories(*)")
      .eq("client_id", clientId);

    const liveCitations = citations?.filter((c) => c.status === "live") || [];
    const pendingCitations =
      citations?.filter((c) => c.status === "pending") || [];

    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a local SEO expert generating a client report for a UK business.

Client Details:
- Business: ${client.business_name}
- Category: ${client.category}
- Location: ${client.city}, ${client.postcode}
- Citation Score: ${client.citation_score}/100
- Live Citations: ${client.live_citations}
- Pending Citations: ${client.pending_citations}
- Total Citations Tracked: ${citations?.length || 0}

Live citations on: ${liveCitations.map((c) => c.directories?.name).join(", ") || "None yet"}
Pending citations on: ${pendingCitations.map((c) => c.directories?.name).join(", ") || "None"}

Generate a professional report with exactly three sections. Return as JSON with these keys:
- summary: 2-3 paragraph overview of current citation status and local SEO health
- insights: 3-5 bullet points of key findings (as a single string with line breaks)
- recommendations: 3-5 actionable next steps to improve local visibility (as a single string with line breaks)

Return ONLY the JSON object, no other text.`,
        },
      ],
    });

    const content = message.content[0];
    const responseText = content.type === "text" ? content.text : "";

    let reportData;
    try {
      reportData = JSON.parse(responseText);
    } catch {
      reportData = {
        summary: "Report generation failed. Please try again.",
        insights: "No insights available.",
        recommendations: "No recommendations available.",
      };
    }

    // Save report to database
    const { data: report, error: reportError } = await supabaseAdmin
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
        client_id: clientId,
        report_type: report.report_type,
        summary: report.summary,
        insights: report.insights,
        recommendations: report.recommendations,
        created_at: report.created_at,
      },
    });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
