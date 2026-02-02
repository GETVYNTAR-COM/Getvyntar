"use client";

import { useEffect, useState } from "react";
import { Users, Globe, Clock, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalClients: number;
  liveCitations: number;
  pendingCitations: number;
  avgScore: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  time: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    liveCitations: 0,
    pendingCitations: 0,
    avgScore: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      // Get agency
      const { data: agency } = await supabase
        .from("agencies")
        .select("id")
        .eq("user_id", session.user.id)
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
        const totalLive = clients.reduce(
          (sum, c) => sum + (c.live_citations || 0),
          0
        );
        const totalPending = clients.reduce(
          (sum, c) => sum + (c.pending_citations || 0),
          0
        );
        const avgScore = Math.round(
          clients.reduce((sum, c) => sum + (c.citation_score || 0), 0) /
            clients.length
        );

        setStats({
          totalClients: clients.length,
          liveCitations: totalLive,
          pendingCitations: totalPending,
          avgScore,
        });

        // Build activity from recent clients
        const recentActivities: Activity[] = clients
          .slice(0, 5)
          .map((client) => ({
            id: client.id,
            type: "client",
            message: `${client.business_name} added in ${client.city}`,
            time: new Date(client.created_at).toLocaleDateString(),
          }));
        setActivities(recentActivities);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Live Citations",
      value: stats.liveCitations,
      icon: Globe,
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
    },
    {
      label: "Pending Citations",
      value: stats.pendingCitations,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      label: "Avg Score",
      value: stats.avgScore,
      icon: BarChart3,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400">
          Overview of your local SEO performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg ${stat.bgColor} p-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {activities.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-slate-500">
              No recent activity. Add your first client to get started.
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand-green" />
                  <span className="text-sm text-slate-300">
                    {activity.message}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
