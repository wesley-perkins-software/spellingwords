import { describe, expect, it } from 'vitest';
import {
  coreSpellingGatewaySummaries,
  hfwGatewaySummaries,
  themedGatewaySummaries,
  CORE_DEVELOPMENT_BRIDGE,
} from './strandGatewayPreview';
import { gradeHubPreview } from './gradeHubPreview';
import { gradeConfig } from './gradeConfig';

describe('cross-grade strand gateway editorial copy', () => {
  it('has a non-empty, distinct-from-the-Hub summary for every grade on all three strands', () => {
    for (const { grade } of gradeConfig) {
      expect(coreSpellingGatewaySummaries[grade].summary.trim().length).toBeGreaterThan(0);
      expect(hfwGatewaySummaries[grade].role.trim().length).toBeGreaterThan(0);
      expect(themedGatewaySummaries[grade].intro.trim().length).toBeGreaterThan(0);

      // Duplication control (Part 19): the cross-grade sentence must not be byte-identical
      // to the Grade Hub's own curated facts for the same grade.
      const hub = gradeHubPreview[grade];
      expect(coreSpellingGatewaySummaries[grade].summary).not.toBe(hub.coreFact);
      expect(hfwGatewaySummaries[grade].role).not.toBe(hub.hfwFact);
      expect(themedGatewaySummaries[grade].intro).not.toBe(hub.themedFact);
    }
  });

  it('has exactly three Core development bridge stages', () => {
    expect(CORE_DEVELOPMENT_BRIDGE).toHaveLength(3);
    for (const stage of CORE_DEVELOPMENT_BRIDGE) {
      expect(stage.trim().length).toBeGreaterThan(0);
    }
  });
});
