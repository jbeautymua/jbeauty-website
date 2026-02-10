import { supabase } from "@/lib/supabase";
import AboutContent from "@/components/about/AboutContent";

export default async function AboutPage() {
  const { data } = await supabase
    .from("business_info")
    .select("about_image_url")
    .eq("id", 1)
    .single();

  return <AboutContent aboutImageUrl={data?.about_image_url ?? ""} />;
}
