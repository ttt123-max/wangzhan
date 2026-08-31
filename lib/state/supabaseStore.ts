import type { SupabaseClient } from '@supabase/supabase-js';
import type { BrowsingRecord, UserProfile } from '../types';
import { applyUnlock } from '../logic/points';
import type { UnlockResult, UserStateAdapter } from './types';

export function createSupabaseStateStore(client: SupabaseClient): UserStateAdapter {
  return {
    async loadProfile(): Promise<UserProfile | null> {
      const {
        data: { user },
        error
      } = await client.auth.getUser();
      if (error || !user) return null;
      const { data } = await client
        .from('profiles')
        .select('id, nickname, points')
        .eq('id', user.id)
        .single();
      return data as UserProfile | null;
    },

    async recordQuiz(quizId, correct, pointsEarned): Promise<boolean> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return false;

      const { data: existing } = await client
        .from('user_quiz_attempts')
        .select('id')
        .eq('user_id', user.id)
        .eq('quiz_id', quizId)
        .maybeSingle();
      if (existing) return false;

      await client.from('user_quiz_attempts').insert({
        user_id: user.id,
        quiz_id: quizId,
        is_correct: correct,
        points_earned: correct ? pointsEarned : 0
      });
      if (correct) {
        await client.rpc('add_points', { user_id: user.id, amount: pointsEarned });
      }
      return true;
    },

    async getAttemptedQuizIds(): Promise<number[]> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return [];
      const { data } = await client
        .from('user_quiz_attempts')
        .select('quiz_id')
        .eq('user_id', user.id);
      return (data ?? []).map((r) => r.quiz_id);
    },

    async unlockTopic(topicId, cost): Promise<UnlockResult> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return 'insufficient';

      const { data: unlocked } = await client
        .from('unlocked_topics')
        .select('id')
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .maybeSingle();
      if (unlocked) return 'already';

      const { data: profile } = await client
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();
      const next = applyUnlock(profile?.points ?? 0, cost);
      if (next === null) return 'insufficient';

      await client.from('unlocked_topics').insert({ user_id: user.id, topic_id: topicId });
      await client
        .from('profiles')
        .update({ points: next })
        .eq('id', user.id);
      return 'unlocked';
    },

    async getUnlockedTopicIds(): Promise<number[]> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return [];
      const { data } = await client
        .from('unlocked_topics')
        .select('topic_id')
        .eq('user_id', user.id);
      return (data ?? []).map((r) => r.topic_id);
    },

    async addHistory(entityType, entityId): Promise<void> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return;
      await client.from('browsing_history').insert({
        user_id: user.id,
        entity_type: entityType,
        entity_id: entityId
      });
    },

    async getHistory(): Promise<BrowsingRecord[]> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return [];
      const { data } = await client
        .from('browsing_history')
        .select('id, entity_type, entity_id, viewed_at')
        .eq('user_id', user.id)
        .order('viewed_at', { ascending: false });
      return (data ?? []).map((r) => ({
        id: r.id,
        entityType: r.entity_type,
        entityId: r.entity_id,
        viewedAt: r.viewed_at
      }));
    },

    async logQuestion(question, matchedTopicId): Promise<void> {
      const {
        data: { user }
      } = await client.auth.getUser();
      if (!user) return;
      await client.from('question_logs').insert({
        user_id: user.id,
        question,
        matched_topic_id: matchedTopicId
      });
    }
  };
}
