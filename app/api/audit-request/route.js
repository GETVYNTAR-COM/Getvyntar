import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  let submission;

  try {
    submission = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, businessName, email, phone, website, town, mainService, source, _hp } = submission;

  if (_hp) {
    return NextResponse.json({ success: true });
  }

  if (!name || !businessName || !email || !town || !mainService) {
    return NextResponse.json(
      { error: 'Name, business name, email, town, and main service are required' },
      { status: 400 }
    );
  }

  const timestamp = new Date().toISOString();
  const ukTime = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const record = { name, businessName, email, phone, website, town, mainService, source, timestamp };

  console.log('[AUDIT_REQUEST]', JSON.stringify(record));

  // ── Save to Supabase ──
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from('scan_requests').insert({
        name,
        business_name: businessName,
        email,
        phone: phone || null,
        website: website || null,
        town,
        main_service: mainService,
        source: source || null,
      });
      if (error) {
        console.error('[SUPABASE] Insert failed:', JSON.stringify(error));
      } else {
        console.log('[SUPABASE] Submission saved');
      }
    } catch (err) {
      console.error('[SUPABASE] Unexpected error:', err.message);
    }
  } else {
    console.warn('[SUPABASE] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured — skipping save');
  }

  // ── Send emails (failures are logged, never block the response) ──
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.error('[EMAIL] RESEND_API_KEY not configured — skipping emails');
    return NextResponse.json({ success: true, emailsSent: false });
  }

  const resend = new Resend(resendKey);

  const firstName = extractFirstName(name);
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  const [notifyResult, ackResult] = await Promise.allSettled([
    resend.emails.send({
      from: 'VYNTAR Audits <audits@vyntarseo.com>',
      to: 'dave@vyntarseo.com',
      subject: `New Visibility Scan Request — ${businessName}`,
      text: [
        `New scan request received at ${ukTime}`,
        '',
        `Name:          ${name}`,
        `Business:      ${businessName}`,
        `Town:          ${town}`,
        `Main service:  ${mainService}`,
        `Email:         ${email}`,
        `Phone:         ${phone || '(not provided)'}`,
        `Website:       ${website || '(not provided)'}`,
        `Source:        ${source || '(direct)'}`,
      ].join('\n'),
    }),

    resend.emails.send({
      from: 'Dave Heatley <dave@vyntarseo.com>',
      to: email,
      subject: 'Your Google Visibility Scan Request',
      text: [
        greeting,
        '',
        'Thanks for requesting a free Google Visibility Scan.',
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
  if (first.length <= 1) return null;
  const titles = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'sir', 'dame', 'rev'];
  if (titles.includes(first.toLowerCase().replace(/\./g, ''))) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
}
