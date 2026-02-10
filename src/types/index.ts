export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  categoryId: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
