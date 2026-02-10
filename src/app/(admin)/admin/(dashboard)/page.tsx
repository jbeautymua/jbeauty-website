import { createSupabaseServer } from "@/lib/supabase-server";
import { FolderOpen, Scissors, Image, MessageSquare } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServer();

  const [categories, services, portfolio, submissions] = await Promise.all([
    supabase.from("service_categories").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("portfolio_items").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Categories", count: categories.count ?? 0, icon: FolderOpen },
    { label: "Services", count: services.count ?? 0, icon: Scissors },
    { label: "Portfolio Items", count: portfolio.count ?? 0, icon: Image },
    { label: "Submissions", count: submissions.count ?? 0, icon: MessageSquare },
  ];

  // Recent submissions
  const { data: recentSubmissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-5 border border-border/50 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-3xl font-semibold">{stat.count}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-border/50 shadow-sm">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold">Recent Submissions</h2>
        </div>
        {recentSubmissions && recentSubmissions.length > 0 ? (
          <div className="divide-y divide-border/50">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{sub.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(sub.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {sub.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-muted-foreground text-sm">
            No submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}
