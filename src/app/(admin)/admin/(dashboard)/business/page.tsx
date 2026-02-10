import { createSupabaseServer } from "@/lib/supabase-server";
import BusinessInfoForm from "@/components/admin/BusinessInfoForm";

export default async function AdminBusinessPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("business_info")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Business Info
      </h1>
      {data ? (
        <BusinessInfoForm data={data} />
      ) : (
        <p className="text-muted-foreground">
          No business info found. Please run the seed SQL first.
        </p>
      )}
    </div>
  );
}
