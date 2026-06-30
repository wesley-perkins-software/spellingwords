import { describe, expect, it } from 'vitest';
import { gradeConfig, getAdjacentGrades } from './gradeConfig';

describe('gradeConfig', () => {
  it('contains exactly the six K-5 grades in order', () => {
    expect(gradeConfig.map((g) => g.grade)).toEqual(['K', '1', '2', '3', '4', '5']);
  });
});

describe('getAdjacentGrades', () => {
  it('returns only a next grade for kindergarten', () => {
    const { prev, next } = getAdjacentGrades('K');
    expect(prev).toBeUndefined();
    expect(next?.grade).toBe('1');
  });

  it('returns only a prev grade for 5th grade', () => {
    const { prev, next } = getAdjacentGrades('5');
    expect(prev?.grade).toBe('4');
    expect(next).toBeUndefined();
  });

  it('returns both neighbors for a middle grade', () => {
    const { prev, next } = getAdjacentGrades('3');
    expect(prev?.grade).toBe('2');
    expect(next?.grade).toBe('4');
  });
});
