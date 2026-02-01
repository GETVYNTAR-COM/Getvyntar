import Link from "next/link";

const features = [
  {
    title: "AI Citation Optimizer",
    description:
      "Smart algorithm matches your clients to the highest-impact directories for their niche and location.",
  },
  {
    title: "AI Report Generator",
    description:
      "Generate white-label citation reports with insights, scores, and recommendations in seconds.",
  },
  {
    title: "AI NAP Checker",
    description:
      "Automatically audit Name, Address, Phone consistency across all directory listings.",
  },
  {
    title: "60+ UK Directories",
    description:
      "Pre-loaded with 65 UK directories including Yell, Thomson Local, Checkatrade, and industry-specific listings.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "£297",
    period: "/mo",
    description: "For solo agencies getting started",
    features: [
      "Up to 10 clients",
      "30 directories per client",
      "Monthly reports",
      "Email support",
      "AI Citation Optimizer",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "£497",
    period: "/mo",
    description: "For growing agencies",
    features: [
      "Up to 30 clients",
      "All 65 directories",
      "Weekly reports",
      "Priority support",
      "AI Citation Optimizer",
      "AI NAP Checker",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "£997",
    period: "/mo",
    description: "For established agencies",
    features: [
      "Unlimited clients",
      "All 65 directories",
      "Real-time reports",
      "Dedicated account manager",
      "AI Citation Optimizer",
      "AI NAP Checker",
      "White-label reports",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export default function LocalSeoPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <span className="text-[#22c55e]">Vyntar</span> Local SEO
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          14-day free trial &middot; No credit card required
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Local SEO on{" "}
          <span className="text-[#22c55e]">Autopilot</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
          AI-powered citation building for UK agencies. Manage clients, build
          citations across 65+ directories, and generate reports — all from one
          dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto"
          >
            Start Your Free Trial
          </Link>
          <Link
            href="#pricing"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "65+", label: "UK Directories" },
            { value: "10,000+", label: "Citations Built" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "4.9/5", label: "Agency Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-bold text-[#22c55e]">
                {stat.value}
              </div>
              <div className="text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Everything You Need to Dominate Local Search
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Purpose-built for UK SEO agencies. Automate the tedious work and focus
          on growing your business.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <div className="w-10 h-10 bg-[#22c55e]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-[#22c55e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 ${
                plan.highlighted
                  ? "bg-[#22c55e]/10 border-2 border-[#22c55e] relative"
                  : "bg-slate-800/50 border border-slate-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-1">
                {plan.name}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <Link
                href="/auth/signup"
                className={`block text-center py-3 rounded-lg font-medium transition-colors mb-6 ${
                  plan.highlighted
                    ? "bg-[#22c55e] hover:bg-[#16a34a] text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#22c55e] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Vyntar Local SEO. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
