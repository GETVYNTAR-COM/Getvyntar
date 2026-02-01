"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

interface Client {
  id: string;
  business_name: string;
  city: string;
  citation_score: number;
  live_citations: number;
  pending_citations: number;
  status: string;
  category: string;
}

export default function ClientsPage() {
  const supabase = createClient();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: agency } = await supabase
        .from("agencies")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!agency) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("clients")
        .select("*")
        .eq("agency_id", agency.id)
        .order("created_at", { ascending: false });

      if (data) setClients(data);
      setLoading(false);
    }

    loadClients();
  }, [supabase]);

  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "bg-[#22c55e]/10 text-[#22c55e]";
      case "paused":
        return "bg-yellow-500/10 text-yellow-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  }

  function getScoreColor(score: number) {
    if (score >= 70) return "text-[#22c55e]";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading clients...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-400 mt-1">
            Manage your local SEO clients
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
          <svg
            className="w-12 h-12 text-slate-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">
            No clients yet
          </h3>
          <p className="text-slate-400 mb-6">
            Add your first client to start building citations.
          </p>
          <Link
            href="/dashboard/clients/new"
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-block"
          >
            Add Your First Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {client.business_name}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                    client.status
                  )}`}
                >
                  {client.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {client.city}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {client.category}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getScoreColor(client.citation_score)}`}>
                    {client.citation_score}
                  </div>
                  <div className="text-xs text-slate-500">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#22c55e]">
                    {client.live_citations}
                  </div>
                  <div className="text-xs text-slate-500">Live</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">
                    {client.pending_citations}
                  </div>
                  <div className="text-xs text-slate-500">Pending</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
