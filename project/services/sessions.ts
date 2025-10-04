import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

type Session = Database['public']['Tables']['sessions']['Row'];
type SessionInsert = Database['public']['Tables']['sessions']['Insert'];
type SessionUpdate = Database['public']['Tables']['sessions']['Update'];

export const sessionService = {
  async createSession(userId: string): Promise<Session> {
    const deviceInfo = {
      platform: Platform.OS,
      modelName: Device.modelName || 'Unknown',
      osName: Device.osName || 'Unknown',
      osVersion: Device.osVersion || 'Unknown',
      deviceName: Device.deviceName || 'Unknown',
    };

    const sessionData: SessionInsert = {
      user_id: userId,
      start_time: new Date().toISOString(),
      device_info: deviceInfo,
      status: 'in_progress',
    };

    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSession(sessionId: string, updates: SessionUpdate): Promise<Session> {
    const { data, error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async completeSession(sessionId: string): Promise<Session> {
    return this.updateSession(sessionId, {
      end_time: new Date().toISOString(),
      status: 'completed',
    });
  },

  async cancelSession(sessionId: string): Promise<Session> {
    return this.updateSession(sessionId, {
      end_time: new Date().toISOString(),
      status: 'cancelled',
    });
  },

  async getSession(sessionId: string): Promise<Session | null> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserSessions(userId: string): Promise<Session[]> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getRecentSessions(userId: string, limit: number = 10): Promise<Session[]> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async deleteSession(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', sessionId);

    if (error) throw error;
  },
};
