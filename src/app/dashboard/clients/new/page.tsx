"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

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
  const supabase = createClient();
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const { data: agency } = await supabase
      .from("agencies")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!agency) {
      setError("Agency not found. Please contact support.");
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
          className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Clients
        </Link>
        <h1 className="text-2xl font-bold text-white">Add New Client</h1>
        <p className="text-slate-400 mt-1">
          Enter the business details for your new client
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-2xl"
      >
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="business_name"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Business Name *
            </label>
            <input
              id="business_name"
              name="business_name"
              type="text"
              value={form.business_name}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="ABC Plumbing Ltd"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="address_line_1"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Address Line 1 *
            </label>
            <input
              id="address_line_1"
              name="address_line_1"
              type="text"
              value={form.address_line_1}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="123 High Street"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              City *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="Manchester"
            />
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Postcode *
            </label>
            <input
              id="postcode"
              name="postcode"
              type="text"
              value={form.postcode}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="M1 1AA"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="0161 123 4567"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="info@abcplumbing.co.uk"
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              placeholder="https://www.abcplumbing.co.uk"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-700">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            {loading ? "Saving..." : "Save Client"}
          </button>
          <Link
            href="/dashboard/clients"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
