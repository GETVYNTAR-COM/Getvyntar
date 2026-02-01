"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const categories = [
  "Plumber",
  "Electrician",
  "Builder",
  "Dentist",
  "Solicitor",
  "Restaurant",
  "Other",
];

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    business_name: "",
    address_line_1: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    website: "",
    category: "Plumber",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const { data: agency } = await supabase
      .from("agencies")
      .select("id")
      .eq("user_id", session.user.id)
      .single();

    if (!agency) {
      setError("Agency not found.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("clients").insert({
      agency_id: agency.id,
      ...form,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/clients");
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/clients"
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
        <h1 className="text-2xl font-bold text-white">Add New Client</h1>
        <p className="text-sm text-slate-400">
          Enter the business details for your new client
        </p>
      </div>

      <div className="max-w-2xl rounded-xl border border-slate-800 bg-slate-900/50 p-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="business_name"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Business Name *
            </label>
            <input
              id="business_name"
              type="text"
              value={form.business_name}
              onChange={(e) => updateField("business_name", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="Smith Plumbing Ltd"
            />
          </div>

          <div>
            <label
              htmlFor="address_line_1"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Address Line 1 *
            </label>
            <input
              id="address_line_1"
              type="text"
              value={form.address_line_1}
              onChange={(e) => updateField("address_line_1", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="123 High Street"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                City *
              </label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Manchester"
              />
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                Postcode *
              </label>
              <input
                id="postcode"
                type="text"
                value={form.postcode}
                onChange={(e) => updateField("postcode", e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="M1 1AA"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="0161 123 4567"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="info@smithplumbing.co.uk"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="website"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Website
            </label>
            <input
              id="website"
              type="url"
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="https://smithplumbing.co.uk"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Category *
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-brand-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-hover transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Client"
              )}
            </button>
            <Link
              href="/dashboard/clients"
              className="rounded-lg border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
