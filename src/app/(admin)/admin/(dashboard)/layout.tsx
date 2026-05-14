import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }
  } catch (error) {
    console.error("Supabase not configured:", error);
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
