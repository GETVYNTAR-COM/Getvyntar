"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, MapPin, Phone, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Client {
  id: string;
  business_name: string;
  city: string;
  postcode: string;
  phone: string;
  category: string;
  citation_score: number;
  live_citations: number;
  pending_citations: number;
  status: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data: agency } = await supabase
        .from("agencies")
        .select("id")
        .eq("user_id", session.user.id)
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
    fetchClients();
  }, []);

  function getScoreColor(score: number) {
    if (score >= 80) return "text-brand-green";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  }

  function getStatusBadge(status: string) {
    const styles =
      status === "active"
        ? "bg-brand-green/10 text-brand-green border-brand-green/30"
        : "bg-slate-700/50 text-slate-400 border-slate-600";
    return (
      <span
        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}
      >
        {status}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400">
            Manage your local SEO clients
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-hover transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          <Globe className="mx-auto mb-4 h-12 w-12 text-slate-600" />
          <h3 className="mb-2 text-lg font-medium text-white">
            No clients yet
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            Add your first client to start building citations.
          </p>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Client
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {client.business_name}
                  </h3>
                  <span className="mt-1 inline-block rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {client.category}
                  </span>
                </div>
                {getStatusBadge(client.status)}
              </div>

              <div className="mb-4 space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {client.city}, {client.postcode}
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {client.phone}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Citation Score</p>
                  <p
                    className={`text-xl font-bold ${getScoreColor(client.citation_score)}`}
                  >
                    {client.citation_score}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>
                    <span className="text-brand-green font-medium">
                      {client.live_citations}
                    </span>{" "}
                    live
                  </p>
                  <p>
                    <span className="text-yellow-400 font-medium">
                      {client.pending_citations}
                    </span>{" "}
                    pending
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
