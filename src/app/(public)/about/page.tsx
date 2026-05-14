import { createSupabaseServer } from "@/lib/supabase-server";
import AboutContent from "@/components/about/AboutContent";

export default async function AboutPage() {
  let aboutImageUrl = "";

  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("business_info")
      .select("about_image_url")
      .eq("id", 1)
      .single();

    aboutImageUrl = data?.about_image_url ?? "";
  } catch (error) {
    console.error("Supabase not configured:", error);
  }

  return <AboutContent aboutImageUrl={aboutImageUrl} />;
}
