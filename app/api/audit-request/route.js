import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  let submission;

  try {
    submission = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, businessName, email, phone, website } = submission;

  if (!name || !businessName || !email) {
    return NextResponse.json(
      { error: 'Name, business name, and email are required' },
      { status: 400 }
    );
  }

  const timestamp = new Date().toISOString();

  const record = { name, businessName, email, phone, website, timestamp };

  // ── Save submission (log to stdout for Vercel's log drain) ──
  console.log('[AUDIT_REQUEST]', JSON.stringify(record));

  // ── Send emails (failures are logged, never block the response) ──
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.error('[EMAIL] RESEND_API_KEY not configured — skipping emails');
    return NextResponse.json({ success: true, emailsSent: false });
  }

  const resend = new Resend(resendKey);

  const firstName = extractFirstName(name);
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  // Fire both emails concurrently; catch each independently
  const [notifyResult, ackResult] = await Promise.allSettled([
    // 1. Internal notification to Dave
    resend.emails.send({
      from: 'VYNTAR Audits <audits@vyntarseo.com>',
      to: 'dave@vyntarseo.com',
      subject: `New Visibility Audit Request — ${businessName}`,
      text: [
        `New audit request received at ${timestamp}`,
        '',
        `Name:          ${name}`,
        `Business:      ${businessName}`,
        `Email:         ${email}`,
        `Phone:         ${phone || '(not provided)'}`,
        `Website:       ${website || '(not provided)'}`,
      ].join('\n'),
    }),

    // 2. Acknowledgement to the requester
    resend.emails.send({
      from: 'Dave Heatley <dave@vyntarseo.com>',
      to: email,
      subject: 'Your Google Visibility Audit Request',
      text: [
        greeting,
        '',
        'Thanks for requesting a free Google Visibility Audit.',
        '',
        "I review every one of these personally — it's not an automated report. I'll take a proper look at where your business is showing up and come back to you within two working days with what I find.",
        '',
        'Thanks again,',
        'Dave Heatley',
        'VYNTAR',
        'dave@vyntarseo.com',
      ].join('\n'),
    }),
  ]);

  if (notifyResult.status === 'rejected') {
    console.error('[EMAIL] Notification to dave failed:', notifyResult.reason);
  } else if (notifyResult.value?.error) {
    console.error('[EMAIL] Notification to dave error:', JSON.stringify(notifyResult.value.error));
  } else {
    console.log('[EMAIL] Notification to dave sent:', notifyResult.value?.data?.id);
  }

  if (ackResult.status === 'rejected') {
    console.error('[EMAIL] Acknowledgement to requester failed:', ackResult.reason);
  } else if (ackResult.value?.error) {
    console.error('[EMAIL] Acknowledgement to requester error:', JSON.stringify(ackResult.value.error));
  } else {
    console.log('[EMAIL] Acknowledgement to requester sent:', ackResult.value?.data?.id);
  }

  return NextResponse.json({ success: true, emailsSent: true });
}

function extractFirstName(fullName) {
  if (!fullName) return null;
  const trimmed = fullName.trim();
  if (!trimmed) return null;
  const first = trimmed.split(/\s+/)[0];
  // Guard against initials, single chars, or titles
  if (first.length <= 1) return null;
  const titles = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'sir', 'dame', 'rev'];
  if (titles.includes(first.toLowerCase().replace(/\./g, ''))) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
}
