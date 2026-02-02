import Link from "next/link";
import {
  Search,
  FileText,
  CheckCircle,
  Globe,
  Zap,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Citation Optimizer",
    description:
      "Our AI selects the best directories for each client based on niche, location, and authority.",
  },
  {
    icon: FileText,
    title: "AI Report Generator",
    description:
      "Auto-generate client-ready reports with insights, scores, and actionable recommendations.",
  },
  {
    icon: CheckCircle,
    title: "AI NAP Checker",
    description:
      "Detect inconsistencies in Name, Address, Phone across all live citations instantly.",
  },
  {
    icon: Globe,
    title: "60+ UK Directories",
    description:
      "Pre-loaded with 65 UK directories including Yell, Thomson Local, Checkatrade, and more.",
  },
  {
    icon: BarChart3,
    title: "Citation Score Tracking",
    description:
      "Real-time citation scores per client so you can track progress and prove ROI.",
  },
  {
    icon: Shield,
    title: "White-Label Ready",
    description:
      "Present reports under your own brand. Your clients never see our name.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "£297",
    period: "/mo",
    description: "For agencies just getting started with local SEO",
    features: [
      "Up to 10 clients",
      "30 directories per client",
      "AI Citation Optimizer",
      "Monthly reports",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "£497",
    period: "/mo",
    description: "For growing agencies scaling their local SEO",
    features: [
      "Up to 50 clients",
      "All 65 directories",
      "AI Citation Optimizer",
      "AI Report Generator",
      "AI NAP Checker",
      "Weekly reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "£997",
    period: "/mo",
    description: "For established agencies with large client bases",
    features: [
      "Unlimited clients",
      "All 65 directories",
      "All AI features",
      "White-label reports",
      "API access",
      "Daily reports",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export default function LocalSeoPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-6 w-6 text-brand-green" />
              <span className="text-xl font-bold text-white">
                Vyntar<span className="text-brand-green"> Local SEO</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-hover transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 text-sm text-brand-green">
            <Zap className="h-4 w-4" />
            14-day free trial — no card required
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Local SEO on{" "}
            <span className="text-brand-green">Autopilot</span>
          </h1>
          <p className="mb-10 text-xl text-slate-400 sm:text-2xl">
            AI-powered citation building for UK agencies. Submit to 65+
            directories, track scores, and generate reports — all on autopilot.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3.5 text-lg font-semibold text-white hover:bg-brand-green-hover transition-colors"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-8 py-3.5 text-lg font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Everything you need to dominate local search
            </h2>
            <p className="text-lg text-slate-400">
              Built specifically for UK agencies managing multiple local
              businesses.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-brand-green/30 transition-colors"
              >
                <feature.icon className="mb-4 h-8 w-8 text-brand-green" />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-400">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-8 ${
                  plan.highlighted
                    ? "border-brand-green bg-brand-green/5 shadow-lg shadow-brand-green/10"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="mb-2 text-xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mb-6 text-sm text-slate-400">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-brand-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-brand-green text-white hover:bg-brand-green-hover"
                      : "border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Search className="h-5 w-5 text-brand-green" />
            <span className="text-lg font-bold text-white">
              Vyntar<span className="text-brand-green"> Local SEO</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Vyntar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
