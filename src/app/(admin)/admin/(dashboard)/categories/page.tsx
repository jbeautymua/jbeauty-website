import { createSupabaseServer } from "@/lib/supabase-server";
import CategoriesManager from "@/components/admin/CategoriesManager";

export default async function AdminCategoriesPage() {
  let categories: any[] = [];

  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("service_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    categories = data ?? [];
  } catch (error) {
    console.error("Supabase not configured:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Categories
      </h1>
      <CategoriesManager categories={categories} />
    </div>
  );
}
