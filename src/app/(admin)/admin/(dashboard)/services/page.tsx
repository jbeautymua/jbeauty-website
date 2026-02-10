import { createSupabaseServer } from "@/lib/supabase-server";
import ServicesManager from "@/components/admin/ServicesManager";

export default async function AdminServicesPage() {
  const supabase = await createSupabaseServer();
  const [servicesResult, categoriesResult] = await Promise.all([
    supabase.from("services").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("service_categories")
      .select("id, name")
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Services
      </h1>
      <ServicesManager
        services={servicesResult.data ?? []}
        categories={categoriesResult.data ?? []}
      />
    </div>
  );
}
