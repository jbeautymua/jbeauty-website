import { createSupabaseServer } from "@/lib/supabase-server";
import SubmissionsList from "@/components/admin/SubmissionsList";

export default async function AdminSubmissionsPage() {
  let submissions: any[] = [];

  try {
    const supabase = await createSupabaseServer();
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    submissions = data ?? [];
  } catch (error) {
    console.error("Supabase not configured:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Contact Submissions
      </h1>
      <SubmissionsList submissions={submissions} />
    </div>
  );
}
