import { createSupabaseServer } from "@/lib/supabase-server";
import CategoriesManager from "@/components/admin/CategoriesManager";

export default async function AdminCategoriesPage() {
  const supabase = await createSupabaseServer();
  const { data: categories } = await supabase
    .from("service_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Categories
      </h1>
      <CategoriesManager categories={categories ?? []} />
    </div>
  );
}
