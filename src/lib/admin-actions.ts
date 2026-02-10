"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer, createSupabaseAdmin } from "./supabase-server";

// ============================================================
// Auth helper
// ============================================================

async function requireAuth() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

// ============================================================
// Service Categories
// ============================================================

export async function createCategory(data: {
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}) {
  const supabase = await requireAuth();
  const id = crypto.randomUUID();
  const { error } = await supabase.from("service_categories").insert({ id, ...data });
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/categories");
  return { id };
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string; icon?: string; sort_order?: number }
) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("service_categories")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("service_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/categories");
}

// ============================================================
// Services
// ============================================================

export async function createService(data: {
  name: string;
  duration: string;
  price: number;
  description: string;
  category_id: string;
  sort_order: number;
}) {
  const supabase = await requireAuth();
  const id = crypto.randomUUID();
  const { error } = await supabase.from("services").insert({ id, ...data });
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { id };
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    duration?: string;
    price?: number;
    description?: string;
    category_id?: string;
    sort_order?: number;
  }
) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("services").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// ============================================================
// Portfolio Items
// ============================================================

export async function createPortfolioItem(data: {
  title: string;
  category: string;
  image_url?: string;
  gradient_from?: string;
  gradient_to?: string;
  sort_order: number;
}) {
  const supabase = await requireAuth();
  const id = crypto.randomUUID();
  const { error } = await supabase.from("portfolio_items").insert({ id, ...data });
  if (error) throw new Error(error.message);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  return { id };
}

export async function updatePortfolioItem(
  id: string,
  data: {
    title?: string;
    category?: string;
    image_url?: string;
    gradient_from?: string;
    gradient_to?: string;
    sort_order?: number;
  }
) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("portfolio_items")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function deletePortfolioItem(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("portfolio_items")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

// ============================================================
// Business Info
// ============================================================

export async function updateBusinessInfo(data: {
  name?: string;
  phone?: string;
  phone_display?: string;
  email?: string;
  instagram?: string;
  instagram_handle?: string;
  whatsapp?: string;
  treatwell?: string;
  location?: string;
  google_maps_url?: string;
  hours?: Record<string, string>;
}) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("business_info")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/business");
}

// ============================================================
// Contact Submissions
// ============================================================

export async function deleteSubmission(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/submissions");
}

export async function deleteSubmissions(ids: string[]) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/submissions");
}

// ============================================================
// Image Upload
// ============================================================

export async function uploadPortfolioImage(formData: FormData): Promise<string> {
  await requireAuth();
  const supabaseAdmin = await createSupabaseAdmin();

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `portfolio/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from("portfolio-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("portfolio-images").getPublicUrl(filePath);

  return publicUrl;
}
