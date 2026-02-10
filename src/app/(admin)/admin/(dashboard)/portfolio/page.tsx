import { createSupabaseServer } from "@/lib/supabase-server";
import PortfolioManager from "@/components/admin/PortfolioManager";

export default async function AdminPortfolioPage() {
  const supabase = await createSupabaseServer();
  const { data: items } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Portfolio
      </h1>
      <PortfolioManager items={items ?? []} />
    </div>
  );
}
