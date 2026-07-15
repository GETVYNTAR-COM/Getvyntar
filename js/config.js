/* ==========================================================================
   U38 KETTLEBELL STRENGTH — SITE CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update contact details,
   coach names, social links and the weekly timetable.

   Every value below is a PLACEHOLDER — replace before launch.
   ========================================================================== */

const U38 = {
  /* ---- Brand ---- */
  gymName: "U38 Kettlebell Strength",
  tagline: "Boutique kettlebell strength studio",
  memberCount: 65, // active members, used for social proof

  /* ---- Location (PLACEHOLDER — replace with real address) ---- */
  address: {
    line1: "Unit 38, [Industrial Estate Name]",
    line2: "[Street Name]",
    city: "[Town / City]",
    postcode: "[Postcode]",
  },
  // Optional: paste a Google Maps share link here to activate map buttons
  mapUrl: "#",

  /* ---- Contact (phone is a PLACEHOLDER — replace with real number) ---- */
  phone: "[+44 0000 000 000]",
  phoneHref: "tel:+440000000000",
  email: "hello@u38kettlebellstrength.com",
  emailHref: "mailto:hello@u38kettlebellstrength.com",

  /* ---- Domain ---- */
  siteUrl: "https://u38kettlebellstrength.com",

  /* ---- Booking ----
     While the site transitions away from TeamUp, class booking links
     point here. Replace "#" with your TeamUp schedule URL. */
  bookingUrl: "#",

  /* ---- Social links (PLACEHOLDER — replace "#" with real URLs) ---- */
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
  instagramHandle: "@u38kettlebell",

  /* ---- Opening hours (display only) ---- */
  hours: [
    { days: "Monday – Friday", times: "06:00 – 20:00" },
    { days: "Saturday", times: "08:00 – 12:00" },
    { days: "Sunday", times: "Closed" },
  ],

  /* ---- Coaches (PLACEHOLDER names — replace before launch) ---- */
  coaches: [
    {
      name: "[Coach Name]",
      role: "Head Coach & Founder",
      bio: "Founded U38 to prove that a garage-sized studio with great coaching beats a warehouse full of machines. Programs every cycle that runs on the studio floor.",
      credentials: ["StrongFirst SFG II", "Precision Nutrition L1"],
    },
    {
      name: "[Coach Name]",
      role: "Strength Coach",
      bio: "Obsessed with the details — grip, breath, tension. If your swing looks effortless, there's a good chance this coach built it.",
      credentials: ["StrongFirst SFG I", "L3 Personal Trainer"],
    },
    {
      name: "[Coach Name]",
      role: "Conditioning Coach",
      bio: "Runs the sessions that members pretend to dread and secretly love. Believes conditioning should build you up, not break you down.",
      credentials: ["Kettlebell Coach L2", "First Aid Certified"],
    },
    {
      name: "[Coach Name]",
      role: "Foundations & Mobility Coach",
      bio: "Every member's first coach. Leads the Foundations course and keeps the whole community moving well for the long run.",
      credentials: ["L3 Personal Trainer", "FRC Mobility Specialist"],
    },
  ],

  /* ---- Weekly timetable (PLACEHOLDER times — adjust freely) ----
     "coach" is an index into the coaches array above, so timetable
     names stay in sync automatically when you rename a coach. */
  schedule: {
    Monday: [
      { time: "06:15", name: "Kettlebell Strength", coach: 0, duration: "45 min", level: "All levels" },
      { time: "09:30", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
      { time: "12:15", name: "Lunch Express", coach: 1, duration: "30 min", level: "All levels" },
      { time: "17:30", name: "Kettlebell Strength", coach: 0, duration: "45 min", level: "All levels" },
      { time: "18:30", name: "Foundations", coach: 3, duration: "60 min", level: "Beginner" },
    ],
    Tuesday: [
      { time: "06:15", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
      { time: "09:30", name: "Kettlebell Strength", coach: 1, duration: "45 min", level: "All levels" },
      { time: "17:30", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
      { time: "18:30", name: "Kettlebell Strength", coach: 0, duration: "45 min", level: "All levels" },
    ],
    Wednesday: [
      { time: "06:15", name: "Kettlebell Strength", coach: 0, duration: "45 min", level: "All levels" },
      { time: "09:30", name: "Mobility & Restore", coach: 3, duration: "45 min", level: "All levels" },
      { time: "12:15", name: "Lunch Express", coach: 2, duration: "30 min", level: "All levels" },
      { time: "17:30", name: "Kettlebell Strength", coach: 1, duration: "45 min", level: "All levels" },
      { time: "18:30", name: "Foundations", coach: 3, duration: "60 min", level: "Beginner" },
    ],
    Thursday: [
      { time: "06:15", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
      { time: "09:30", name: "Kettlebell Strength", coach: 0, duration: "45 min", level: "All levels" },
      { time: "17:30", name: "Kettlebell Strength", coach: 1, duration: "45 min", level: "All levels" },
      { time: "18:30", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
    ],
    Friday: [
      { time: "06:15", name: "Kettlebell Strength", coach: 1, duration: "45 min", level: "All levels" },
      { time: "09:30", name: "Kettlebell Conditioning", coach: 2, duration: "45 min", level: "All levels" },
      { time: "17:30", name: "Mobility & Restore", coach: 3, duration: "45 min", level: "All levels" },
    ],
    Saturday: [
      { time: "08:00", name: "Team Session", coach: 0, duration: "60 min", level: "All levels" },
      { time: "09:15", name: "Open Gym", coach: 1, duration: "90 min", level: "Members" },
    ],
    Sunday: [], // rest day
  },
};
