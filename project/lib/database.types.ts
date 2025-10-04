export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          start_time: string
          end_time: string | null
          device_info: Json
          status: 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          start_time?: string
          end_time?: string | null
          device_info?: Json
          status?: 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          start_time?: string
          end_time?: string | null
          device_info?: Json
          status?: 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      metrics: {
        Row: {
          id: string
          session_id: string
          timestamp: string
          reaction_time_mean: number | null
          accuracy_rate: number | null
          attention_score: number | null
          blink_rate: number | null
          stress_proxy: number | null
          fatigue_proxy: number | null
          engagement_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          timestamp?: string
          reaction_time_mean?: number | null
          accuracy_rate?: number | null
          attention_score?: number | null
          blink_rate?: number | null
          stress_proxy?: number | null
          fatigue_proxy?: number | null
          engagement_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          timestamp?: string
          reaction_time_mean?: number | null
          accuracy_rate?: number | null
          attention_score?: number | null
          blink_rate?: number | null
          stress_proxy?: number | null
          fatigue_proxy?: number | null
          engagement_index?: number | null
          created_at?: string
        }
      }
      summaries: {
        Row: {
          id: string
          session_id: string
          mean_reaction_time: number | null
          accuracy_overall: number | null
          attention_peak: number | null
          fatigue_trend: string | null
          stress_trend: string | null
          engagement_total: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          mean_reaction_time?: number | null
          accuracy_overall?: number | null
          attention_peak?: number | null
          fatigue_trend?: string | null
          stress_trend?: string | null
          engagement_total?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          mean_reaction_time?: number | null
          accuracy_overall?: number | null
          attention_peak?: number | null
          fatigue_trend?: string | null
          stress_trend?: string | null
          engagement_total?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          asset_type: string
          name: string
          url: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          asset_type: string
          name: string
          url: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          asset_type?: string
          name?: string
          url?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
