"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

interface Stats {
  totalClients: number;
  liveCitations: number;
  pendingCitations: number;
  avgScore: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
}

export default function DashboardPage() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    liveCitations: 0,
    pendingCitations: 0,
    avgScore: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Get agency
      const { data: agency } = await supabase
        .from("agencies")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!agency) {
        setLoading(false);
        return;
      }

      // Get clients
      const { data: clients } = await supabase
        .from("clients")
        .select("*")
        .eq("agency_id", agency.id);

      if (clients && clients.length > 0) {
        const totalClients = clients.length;
        const liveCitations = clients.reduce(
          (sum: number, c: { live_citations: number }) => sum + (c.live_citations || 0),
          0
        );
        const pendingCitations = clients.reduce(
          (sum: number, c: { pending_citations: number }) => sum + (c.pending_citations || 0),
          0
        );
        const avgScore = Math.round(
          clients.reduce(
            (sum: number, c: { citation_score: number }) => sum + (c.citation_score || 0),
            0
          ) / totalClients
        );

        setStats({ totalClients, liveCitations, pendingCitations, avgScore });

        // Build recent activity from clients
        const recentActivities: Activity[] = clients
          .slice(0, 5)
          .map((c: { id: string; business_name: string; created_at: string }) => ({
            id: c.id,
            type: "client_added",
            description: `Client "${c.business_name}" was added`,
            time: new Date(c.created_at).toLocaleDateString(),
          }));
        setActivities(recentActivities);
      }

      setLoading(false);
    }

    loadData();
  }, [supabase]);

  const statCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Live Citations",
      value: stats.liveCitations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: "text-[#22c55e]",
      bg: "bg-[#22c55e]/10",
    },
    {
      label: "Pending Citations",
      value: stats.pendingCitations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Avg Score",
      value: stats.avgScore,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Overview of your local SEO performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} ${card.color} p-2 rounded-lg`}>
                {card.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{card.value}</div>
            <div className="text-slate-400 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h2>
        {activities.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No recent activity. Add your first client to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-3 border-b border-slate-700 last:border-0"
              >
                <div className="w-2 h-2 bg-[#22c55e] rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    {activity.description}
                  </p>
                </div>
                <div className="text-xs text-slate-500">{activity.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
