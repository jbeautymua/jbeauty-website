import { createSupabaseServer } from "@/lib/supabase-server";
import SubmissionsList from "@/components/admin/SubmissionsList";

export default async function AdminSubmissionsPage() {
  const supabase = await createSupabaseServer();
  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold mb-6">
        Contact Submissions
      </h1>
      <SubmissionsList submissions={submissions ?? []} />
    </div>
  );
}
