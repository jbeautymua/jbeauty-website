import { createSupabaseServer } from "@/lib/supabase-server";
import PortfolioManager from "@/components/admin/PortfolioManager";

export default async function AdminPortfolioPage() {
  let items: any[] = [];

  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });

    items = data ?? [];
  } catch (error) {
    console.error("Supabase not configured:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Portfolio
      </h1>
      <PortfolioManager items={items} />
    </div>
  );
}
