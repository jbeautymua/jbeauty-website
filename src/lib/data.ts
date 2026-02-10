import { supabase } from "./supabase";
import type { ServiceCategory, PortfolioItem } from "@/types";

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const [categoriesResult, servicesResult] = await Promise.all([
    supabase
      .from("service_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  if (categoriesResult.error) {
    console.error("Error fetching categories:", categoriesResult.error);
    return [];
  }

  if (servicesResult.error) {
    console.error("Error fetching services:", servicesResult.error);
    return [];
  }

  return categoriesResult.data.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
    services: servicesResult.data
      .filter((svc) => svc.category_id === cat.id)
      .map((svc) => ({
        id: svc.id,
        name: svc.name,
        duration: svc.duration,
        price: Number(svc.price),
        description: svc.description,
        categoryId: svc.category_id,
      })),
  }));
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.image_url,
    gradientFrom: item.gradient_from,
    gradientTo: item.gradient_to,
  }));
}

export async function getPortfolioCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("category")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio categories:", error);
    return ["All"];
  }

  const unique = [...new Set(data.map((item) => item.category))];
  return ["All", ...unique];
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("contact_submissions").insert({
    name: formData.name,
    email: formData.email,
    phone: formData.phone || null,
    message: formData.message,
  });

  if (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to submit your message. Please try again." };
  }

  return { success: true };
}
