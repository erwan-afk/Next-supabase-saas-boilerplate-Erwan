export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Configuration_AutoBlock: {
        Row: {
          AutoBlock_CD: number
          AutoBlock_DM: number
          AutoBlock_KeyBind: string
          AutoBlock_radio: string
          id: string
        }
        Insert: {
          AutoBlock_CD?: number
          AutoBlock_DM?: number
          AutoBlock_KeyBind?: string
          AutoBlock_radio?: string
          id: string
        }
        Update: {
          AutoBlock_CD?: number
          AutoBlock_DM?: number
          AutoBlock_KeyBind?: string
          AutoBlock_radio?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Configuration_AutoBlock_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Configuration_Autoclicker: {
        Row: {
          autoclicker_checkboxes: string[]
          Autoclicker_CPS_Max: number
          Autoclicker_CPS_Min: number
          Autoclicker_KeyBind: string
          autoclicker_radio: string
          Autoclicker_TRB: number
          id: string
        }
        Insert: {
          autoclicker_checkboxes?: string[]
          Autoclicker_CPS_Max?: number
          Autoclicker_CPS_Min?: number
          Autoclicker_KeyBind?: string
          autoclicker_radio?: string
          Autoclicker_TRB?: number
          id: string
        }
        Update: {
          autoclicker_checkboxes?: string[]
          Autoclicker_CPS_Max?: number
          Autoclicker_CPS_Min?: number
          Autoclicker_KeyBind?: string
          autoclicker_radio?: string
          Autoclicker_TRB?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Configuration_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Configuration_FastPlace: {
        Row: {
          FastPlace_checkboxes: string[]
          FastPlace_CPS_Max: number
          FastPlace_CPS_Min: number
          FastPlace_KeyBind: string
          FastPlace_radio: string
          FastPlace_TRB: number
          id: string
        }
        Insert: {
          FastPlace_checkboxes?: string[]
          FastPlace_CPS_Max?: number
          FastPlace_CPS_Min?: number
          FastPlace_KeyBind?: string
          FastPlace_radio?: string
          FastPlace_TRB?: number
          id: string
        }
        Update: {
          FastPlace_checkboxes?: string[]
          FastPlace_CPS_Max?: number
          FastPlace_CPS_Min?: number
          FastPlace_KeyBind?: string
          FastPlace_radio?: string
          FastPlace_TRB?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Configuration_FastPlace_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Modules: {
        Row: {
          autoblock_active: boolean
          autoblock_favorite: boolean
          autoclicker_active: boolean
          autoclicker_favorite: boolean
          fastplace_active: boolean
          fastplace_favorite: boolean
          id: string
          randomfeature_active: boolean
          randomfeature_favorite: boolean
        }
        Insert: {
          autoblock_active?: boolean
          autoblock_favorite?: boolean
          autoclicker_active?: boolean
          autoclicker_favorite?: boolean
          fastplace_active?: boolean
          fastplace_favorite?: boolean
          id: string
          randomfeature_active?: boolean
          randomfeature_favorite?: boolean
        }
        Update: {
          autoblock_active?: boolean
          autoblock_favorite?: boolean
          autoclicker_active?: boolean
          autoclicker_favorite?: boolean
          fastplace_active?: boolean
          fastplace_favorite?: boolean
          id?: string
          randomfeature_active?: boolean
          randomfeature_favorite?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "Modules_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          AutoDestruction_checkboxes: string[]
          AutoDestruction_keybind: string
          created_at: string
          display_name: string | null
          email: string
          end_at: string | null
          id: string
          image_url: string | null
          referral_code: string
          referral_count: number
          Weapons_checkboxes: string[]
        }
        Insert: {
          AutoDestruction_checkboxes?: string[]
          AutoDestruction_keybind?: string
          created_at?: string
          display_name?: string | null
          email: string
          end_at?: string | null
          id: string
          image_url?: string | null
          referral_code?: string
          referral_count?: number
          Weapons_checkboxes?: string[]
        }
        Update: {
          AutoDestruction_checkboxes?: string[]
          AutoDestruction_keybind?: string
          created_at?: string
          display_name?: string | null
          email?: string
          end_at?: string | null
          id?: string
          image_url?: string | null
          referral_code?: string
          referral_count?: number
          Weapons_checkboxes?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string
          end_at: string | null
          subscription_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email: string
          end_at?: string | null
          subscription_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string
          end_at?: string | null
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_subscription_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_sub_active: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
