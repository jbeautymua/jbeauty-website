import { createSupabaseServer } from "@/lib/supabase-server";
import AboutManager from "@/components/admin/AboutManager";

export default async function AdminAboutPage() {
  let currentImageUrl = "";

  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("business_info")
      .select("about_image_url")
      .eq("id", 1)
      .single();

    currentImageUrl = data?.about_image_url ?? "";
  } catch (error) {
    console.error("Supabase not configured:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        About Page
      </h1>
      <AboutManager currentImageUrl={currentImageUrl} />
    </div>
  );
}
