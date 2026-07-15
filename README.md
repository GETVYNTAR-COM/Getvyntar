# U38 Kettlebell Strength — Website (Version 1)

The public website for **U38 Kettlebell Strength**, a boutique kettlebell strength
studio with 65+ active members. Version 1 is a fast, fully static site (no build
step) that will grow into a full member platform replacing TeamUp.

**Live domain:** [u38kettlebellstrength.com](https://u38kettlebellstrength.com)

## Stack

- HTML5 / CSS / vanilla JavaScript — no frameworks, no build step
- Hosted on **Vercel** (static deployment, `vercel.json` included)
- **Version 2 (planned):** Supabase (members & bookings), Stripe (payments), n8n (automations)

## Pages

| Page | File |
|---|---|
| Home (hero video, social proof, memberships, coaches, community, gallery, contact) | `index.html` |
| About | `about.html` |
| Memberships | `memberships.html` |
| Timetable | `timetable.html` |
| Meet the Coaches | `coaches.html` |
| Community | `community.html` |
| Contact | `contact.html` |
| Free Trial | `free-trial.html` |

## ✏️ Updating the site (start here)

**Almost everything editable lives in [`js/config.js`](js/config.js):**

- Coach names, roles, bios and credentials
- Address, phone number, email
- Social media links and Instagram handle
- Opening hours
- The full weekly timetable
- TeamUp booking link (`bookingUrl`)

Values wrapped in `[square brackets]` are placeholders — replace them before launch.

### Hero video

Drop a video at **`assets/video/hero.mp4`** (H.264 MP4, muted, 15–30 second loop,
ideally under 8 MB). Until the file exists, the homepage automatically shows a
branded gradient backdrop instead — nothing breaks.

### Photos

Gallery and section images are currently placeholder tiles. Replace the
`<figure class="gallery-item">` blocks with real `<img>` tags (see the HTML
comments in `index.html`), and put images in `assets/img/gallery/`.

### Placeholder pricing

Membership prices in `index.html` and `memberships.html` are placeholders —
search for the `Placeholder pricing` comment and update before launch.

## Local development

No build step needed. From the repo root:

```bash
npx serve .
```

(`serve` resolves clean URLs like `/about` the same way Vercel does.)

## Deploying to Vercel

1. Import this repo in Vercel → framework preset **"Other"** (static).
2. No build command, no output directory — deploy the root.
3. Add the `u38kettlebellstrength.com` domain in Vercel → Settings → Domains.

`vercel.json` handles clean URLs (`/about` instead of `/about.html`), long-lived
caching for assets, and basic security headers.

## Version 2 roadmap

- Supabase: member accounts, class bookings, waitlists
- Stripe: online joining, membership payments
- n8n: automated onboarding emails, trial follow-ups, TeamUp migration
