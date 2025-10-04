import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Metric = Database['public']['Tables']['metrics']['Row'];
type MetricInsert = Database['public']['Tables']['metrics']['Insert'];

export interface MetricData {
  sessionId: string;
  reactionTimeMean?: number;
  accuracyRate?: number;
  attentionScore?: number;
  blinkRate?: number;
  stressProxy?: number;
  fatigueProxy?: number;
  engagementIndex?: number;
}

export const metricsService = {
  async logMetric(data: MetricData): Promise<Metric> {
    const metricData: MetricInsert = {
      session_id: data.sessionId,
      timestamp: new Date().toISOString(),
      reaction_time_mean: data.reactionTimeMean,
      accuracy_rate: data.accuracyRate,
      attention_score: data.attentionScore,
      blink_rate: data.blinkRate,
      stress_proxy: data.stressProxy,
      fatigue_proxy: data.fatigueProxy,
      engagement_index: data.engagementIndex,
    };

    const { data: metric, error } = await supabase
      .from('metrics')
      .insert(metricData)
      .select()
      .single();

    if (error) throw error;
    return metric;
  },

  async getSessionMetrics(sessionId: string): Promise<Metric[]> {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async deleteSessionMetrics(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('metrics')
      .delete()
      .eq('session_id', sessionId);

    if (error) throw error;
  },

  generatePlaceholderMetric(sessionId: string): MetricData {
    return {
      sessionId,
      reactionTimeMean: Math.random() * 100 + 200,
      accuracyRate: Math.random() * 20 + 75,
      attentionScore: Math.random() * 20 + 70,
      blinkRate: Math.random() * 10 + 12,
      stressProxy: Math.random() * 40 + 20,
      fatigueProxy: Math.random() * 30 + 20,
      engagementIndex: Math.random() * 25 + 65,
    };
  },

  async logPlaceholderMetrics(sessionId: string, count: number = 10): Promise<Metric[]> {
    const metrics: Metric[] = [];

    for (let i = 0; i < count; i++) {
      const placeholderData = this.generatePlaceholderMetric(sessionId);

      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const metric = await this.logMetric(placeholderData);
        metrics.push(metric);
      } catch (error) {
        console.error('Error logging placeholder metric:', error);
      }
    }

    return metrics;
  },

  async calculateSessionAverages(sessionId: string) {
    const metrics = await this.getSessionMetrics(sessionId);

    if (metrics.length === 0) {
      return null;
    }

    const sum = metrics.reduce(
      (acc, metric) => ({
        reactionTime: acc.reactionTime + (metric.reaction_time_mean || 0),
        accuracy: acc.accuracy + (metric.accuracy_rate || 0),
        attention: acc.attention + (metric.attention_score || 0),
        blink: acc.blink + (metric.blink_rate || 0),
        stress: acc.stress + (metric.stress_proxy || 0),
        fatigue: acc.fatigue + (metric.fatigue_proxy || 0),
        engagement: acc.engagement + (metric.engagement_index || 0),
      }),
      {
        reactionTime: 0,
        accuracy: 0,
        attention: 0,
        blink: 0,
        stress: 0,
        fatigue: 0,
        engagement: 0,
      }
    );

    const count = metrics.length;

    return {
      meanReactionTime: sum.reactionTime / count,
      accuracyOverall: sum.accuracy / count,
      attentionPeak: Math.max(...metrics.map(m => m.attention_score || 0)),
      avgStress: sum.stress / count,
      avgFatigue: sum.fatigue / count,
      engagementTotal: sum.engagement / count,
    };
  },
};
