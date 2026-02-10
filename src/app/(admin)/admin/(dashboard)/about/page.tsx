import { createSupabaseServer } from "@/lib/supabase-server";
import AboutManager from "@/components/admin/AboutManager";

export default async function AdminAboutPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("business_info")
    .select("about_image_url")
    .eq("id", 1)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        About Page
      </h1>
      <AboutManager currentImageUrl={data?.about_image_url ?? ""} />
    </div>
  );
}
