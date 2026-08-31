import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn', () => {
  it('joins truthy classes', () => {
    expect(cn('a', false, 'b', null, 'c')).toBe('a b c');
  });
});
