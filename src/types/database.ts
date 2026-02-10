export type Database = {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          icon: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["category_id"];
          },
        ];
      };
      services: {
        Row: {
          id: string;
          name: string;
          duration: string;
          price: number;
          description: string;
          category_id: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          duration: string;
          price: number;
          description: string;
          category_id: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          duration?: string;
          price?: number;
          description?: string;
          category_id?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "service_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      portfolio_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          image_url: string;
          gradient_from: string;
          gradient_to: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          category: string;
          image_url?: string;
          gradient_from?: string;
          gradient_to?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          image_url?: string;
          gradient_from?: string;
          gradient_to?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      business_info: {
        Row: {
          id: number;
          name: string;
          phone: string;
          phone_display: string;
          email: string;
          instagram: string;
          instagram_handle: string;
          whatsapp: string;
          treatwell: string;
          location: string;
          google_maps_url: string;
          hours: Record<string, string>;
          about_image_url: string;
          updated_at: string;
        };
        Insert: {
          id: number;
          name: string;
          phone: string;
          phone_display: string;
          email: string;
          instagram: string;
          instagram_handle: string;
          whatsapp: string;
          treatwell: string;
          location: string;
          google_maps_url: string;
          hours: Record<string, string>;
          about_image_url?: string;
          updated_at?: string;
        };
        Update: {
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
          about_image_url?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
