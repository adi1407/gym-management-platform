export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string;
          slug: string;
          name: string;
          price_label: string;
          period_label: string;
          duration_days: number;
          featured: boolean;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          price_label: string;
          period_label: string;
          duration_days: number;
          featured?: boolean;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          price_label?: string;
          period_label?: string;
          duration_days?: number;
          featured?: boolean;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      trial_bookings: {
        Row: {
          id: string;
          package_id: string;
          visit_date: string;
          visit_time: string;
          full_name: string;
          email: string;
          phone: string;
          status: "new" | "contacted" | "converted" | "cancelled";
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          visit_date: string;
          visit_time: string;
          full_name: string;
          email: string;
          phone: string;
          status?: "new" | "contacted" | "converted" | "cancelled";
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          visit_date?: string;
          visit_time?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          status?: "new" | "contacted" | "converted" | "cancelled";
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trial_bookings_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          notes: string | null;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          notes?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          notes?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      memberships: {
        Row: {
          id: string;
          member_id: string;
          package_id: string;
          starts_on: string;
          ends_on: string;
          status: "active" | "expired" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          package_id: string;
          starts_on: string;
          ends_on: string;
          status?: "active" | "expired" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          package_id?: string;
          starts_on?: string;
          ends_on?: string;
          status?: "active" | "expired" | "cancelled";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "memberships_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memberships_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_profiles: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      sync_membership_status: { Args: Record<string, never>; Returns: undefined };
      book_trial_visit: {
        Args: {
          p_package_slug: string;
          p_visit_date: string;
          p_visit_time: string;
          p_full_name: string;
          p_email: string;
          p_phone: string;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type TrialBooking = Database["public"]["Tables"]["trial_bookings"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
export type Membership = Database["public"]["Tables"]["memberships"]["Row"];
