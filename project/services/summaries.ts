import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { metricsService } from './metrics';

type Summary = Database['public']['Tables']['summaries']['Row'];
type SummaryInsert = Database['public']['Tables']['summaries']['Insert'];
type SummaryUpdate = Database['public']['Tables']['summaries']['Update'];

export interface CreateSummaryData {
  sessionId: string;
  meanReactionTime: number;
  accuracyOverall: number;
  attentionPeak: number;
  fatigueTrend: string;
  stressTrend: string;
  engagementTotal: number;
}

export const summariesService = {
  async createSummary(data: CreateSummaryData): Promise<Summary> {
    const summaryData: SummaryInsert = {
      session_id: data.sessionId,
      mean_reaction_time: data.meanReactionTime,
      accuracy_overall: data.accuracyOverall,
      attention_peak: data.attentionPeak,
      fatigue_trend: data.fatigueTrend,
      stress_trend: data.stressTrend,
      engagement_total: data.engagementTotal,
    };

    const { data: summary, error } = await supabase
      .from('summaries')
      .insert(summaryData)
      .select()
      .single();

    if (error) throw error;
    return summary;
  },

  async createSummaryFromSession(sessionId: string): Promise<Summary> {
    const averages = await metricsService.calculateSessionAverages(sessionId);

    if (!averages) {
      throw new Error('No metrics found for session');
    }

    const fatigueTrend = averages.avgFatigue > 50 ? 'increasing' : averages.avgFatigue > 30 ? 'stable' : 'decreasing';
    const stressTrend = averages.avgStress > 50 ? 'high' : averages.avgStress > 30 ? 'moderate' : 'low';

    return this.createSummary({
      sessionId,
      meanReactionTime: averages.meanReactionTime,
      accuracyOverall: averages.accuracyOverall,
      attentionPeak: averages.attentionPeak,
      fatigueTrend,
      stressTrend,
      engagementTotal: averages.engagementTotal,
    });
  },

  async getSummary(summaryId: string): Promise<Summary | null> {
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('id', summaryId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getSummaryBySession(sessionId: string): Promise<Summary | null> {
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserSummaries(userId: string): Promise<(Summary & { session: any })[]> {
    const { data, error } = await supabase
      .from('summaries')
      .select(`
        *,
        session:sessions(*)
      `)
      .eq('sessions.user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any || [];
  },

  async updateSummary(summaryId: string, updates: SummaryUpdate): Promise<Summary> {
    const { data, error } = await supabase
      .from('summaries')
      .update(updates)
      .eq('id', summaryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSummary(summaryId: string): Promise<void> {
    const { error } = await supabase
      .from('summaries')
      .delete()
      .eq('id', summaryId);

    if (error) throw error;
  },

  async getRecentSummaries(userId: string, limit: number = 10): Promise<any[]> {
    const { data, error } = await supabase
      .from('summaries')
      .select(`
        *,
        session:sessions!inner(
          id,
          start_time,
          end_time,
          user_id
        )
      `)
      .eq('session.user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};
