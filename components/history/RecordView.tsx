'use client';

import { useEffect, useRef } from 'react';
import { createStateStore } from '@/lib/state';

export function RecordView({ entityType, entityId }: { entityType: 'article' | 'faq'; entityId: number }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    createStateStore()
      .addHistory(entityType, entityId)
      .catch(() => undefined);
  }, [entityType, entityId]);
  return null;
}
