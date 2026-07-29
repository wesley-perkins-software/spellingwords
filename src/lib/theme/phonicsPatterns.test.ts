import { describe, expect, it } from 'vitest';
import { prepareWordDisplay } from './phonicsPatterns';

/** Collapses segments back to a readable string like "h[a]t" for assertions. */
function render(segments: { text: string; highlight: boolean }[]): string {
  return segments.map((s) => (s.highlight ? `[${s.text}]` : s.text)).join('');
}

describe('prepareWordDisplay — kindergarten-short-a-words (short-vowels, short-a, cvc)', () => {
  const tags = ['grade-K', 'short-vowels', 'short-a', 'cvc'];
  const words = ['hat', 'mat', 'sat', 'man', 'can', 'bag', 'cap', 'map'];
  const result = prepareWordDisplay(words, tags);

  it('highlights only the vowel letter in every word', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'h[a]t',
      'm[a]t',
      's[a]t',
      'm[a]n',
      'c[a]n',
      'b[a]g',
      'c[a]p',
      'm[a]p',
    ]);
  });

  it('groups by shared rime, matching the previously-validated hat/mat/sat clustering', () => {
    expect(result.map((r) => r.newGroup)).toEqual([true, false, false, true, false, true, true, false]);
  });
});

describe('prepareWordDisplay — kindergarten-mixed-vowel-review (mixed-short-vowels, cvc)', () => {
  const tags = ['grade-K', 'short-vowels', 'mixed-short-vowels', 'cvc'];
  const words = ['jam', 'lid', 'dog', 'mud', 'get', 'rag', 'hit', 'web', 'nap', 'hop'];
  const result = prepareWordDisplay(words, tags);

  it("highlights each word's own vowel, not a shared one", () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'j[a]m',
      'l[i]d',
      'd[o]g',
      'm[u]d',
      'g[e]t',
      'r[a]g',
      'h[i]t',
      'w[e]b',
      'n[a]p',
      'h[o]p',
    ]);
  });
});

describe('prepareWordDisplay — kindergarten-consonant-digraphs (digraphs, sh, ch, th)', () => {
  const tags = ['grade-K', 'digraphs', 'sh', 'ch', 'th'];
  const words = ['ship', 'shop', 'fish', 'wish', 'chat', 'chin', 'chip', 'bath', 'path'];
  const result = prepareWordDisplay(words, tags);

  it('highlights the digraph wherever it falls — onset (ship) or coda (fish)', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      '[sh]ip',
      '[sh]op',
      'fi[sh]',
      'wi[sh]',
      '[ch]at',
      '[ch]in',
      '[ch]ip',
      'ba[th]',
      'pa[th]',
    ]);
  });

  it('groups contiguously by digraph: sh(4), ch(3), th(2)', () => {
    expect(result.map((r) => r.newGroup)).toEqual([
      true, false, false, false, // sh
      true, false, false, // ch
      true, false, // th
    ]);
  });
});

describe('prepareWordDisplay — grade-1-cvc-short-vowels-c-k-rule (cvc, short-vowels, c-k-ck, spelling-rules)', () => {
  const tags = ['grade-1-core', 'short-vowels', 'cvc', 'c-k-ck', 'spelling-rules'];
  const words = ['cat', 'cot', 'cup', 'kid', 'kit', 'cap', 'back', 'neck', 'kick', 'lock', 'duck', 'sack'];
  const result = prepareWordDisplay(words, tags);

  it('highlights whichever of c/k/ck spells /k/ in each word', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      '[c]at',
      '[c]ot',
      '[c]up',
      '[k]id',
      '[k]it',
      '[c]ap',
      'ba[ck]',
      'ne[ck]',
      '[k]i[ck]', // contains both a bare "k" and "ck" — ck is checked first and wins
      'lo[ck]',
      'du[ck]',
      'sa[ck]',
    ]);
  });

  it('is NOT grouped by rime — cap breaks back into a real (non-contiguous) c-group', () => {
    // cat/cot/cup share "c", kid/kit share "k", cap is "c" again (real content
    // interleaves a review word), then back..sack all share "ck".
    expect(result.map((r) => r.newGroup)).toEqual([
      true, false, false, // c: cat, cot, cup
      true, false, // k: kid, kit
      true, // c again: cap (must re-open, not silently merge with the earlier c-group)
      true, false, false, false, false, false, // ck: back..sack
    ]);
  });
});

describe('prepareWordDisplay — grade-1-long-a-long-o-vowel-teams', () => {
  const tags = ['grade-1-core', 'long-a-and-long-o-vowel-teams'];
  const words = ['rain', 'train', 'wait', 'mail', 'day', 'play', 'boat', 'coat', 'road', 'soap', 'snow', 'grow'];
  const result = prepareWordDisplay(words, tags);

  it('highlights the vowel-team digraph (ai/ay/oa/ow)', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'r[ai]n',
      'tr[ai]n',
      'w[ai]t',
      'm[ai]l',
      'd[ay]',
      'pl[ay]',
      'b[oa]t',
      'c[oa]t',
      'r[oa]d',
      's[oa]p',
      'sn[ow]',
      'gr[ow]',
    ]);
  });

  it('groups by which team: ai(4), ay(2), oa(4), ow(2)', () => {
    expect(result.map((r) => r.newGroup)).toEqual([
      true, false, false, false,
      true, false,
      true, false, false, false,
      true, false,
    ]);
  });
});

describe('prepareWordDisplay — grade-1-long-e-vowel-teams', () => {
  const tags = ['grade-1-core', 'long-e-vowel-teams'];
  const words = ['see', 'tree', 'seed', 'feet', 'green', 'eat', 'seat', 'read', 'team', 'leaf', 'beach', 'clean'];
  const result = prepareWordDisplay(words, tags);

  it('highlights ee or ea', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      's[ee]',
      'tr[ee]',
      's[ee]d',
      'f[ee]t',
      'gr[ee]n',
      '[ea]t',
      's[ea]t',
      'r[ea]d',
      't[ea]m',
      'l[ea]f',
      'b[ea]ch',
      'cl[ea]n',
    ]);
  });
});

describe('prepareWordDisplay — grade-1-long-vowels-silent-e', () => {
  const tags = ['grade-1-core', 'silent-e-long-vowels'];
  const words = ['cake', 'make', 'bike', 'ride', 'rope', 'home', 'cube', 'mule', 'name', 'time', 'bone', 'cute'];
  const result = prepareWordDisplay(words, tags);

  it('highlights the vowel and the final silent e, not the consonant between them', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'c[a]k[e]',
      'm[a]k[e]',
      'b[i]k[e]',
      'r[i]d[e]',
      'r[o]p[e]',
      'h[o]m[e]',
      'c[u]b[e]',
      'm[u]l[e]',
      'n[a]m[e]',
      't[i]m[e]',
      'b[o]n[e]',
      'c[u]t[e]',
    ]);
  });

  it('groups by the internal vowel — the real word order pairs each vowel (cake/make) then revisits all four singly at the end (name/time/bone/cute), it is not one contiguous block per vowel', () => {
    expect(result.map((r) => r.newGroup)).toEqual([
      true, false, // a: cake, make
      true, false, // i: bike, ride
      true, false, // o: rope, home
      true, false, // u: cube, mule
      true, true, true, true, // a, i, o, u — each a single-word group again
    ]);
  });
});

describe('prepareWordDisplay — bl-blend-words (consonant-blends, bl)', () => {
  const tags = ['consonant-blends', 'bl'];
  const words = ['black', 'blade', 'blast', 'blend', 'blink', 'blanket', 'block', 'blow', 'bloom', 'blue'];
  const result = prepareWordDisplay(words, tags);

  it('highlights the beginning blend', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      '[bl]ack',
      '[bl]ade',
      '[bl]ast',
      '[bl]end',
      '[bl]ink',
      '[bl]anket',
      '[bl]ock',
      '[bl]ow',
      '[bl]oom',
      '[bl]ue',
    ]);
  });
});

describe('prepareWordDisplay — grade-1-beginning-consonant-blends (mixed blends, no per-blend tag)', () => {
  const tags = ['grade-1-core', 'beginning-consonant-blends'];
  const words = ['black', 'clap', 'frog', 'glad', 'plum', 'crab', 'stop', 'swim', 'snack', 'train', 'grass', 'drip'];
  const result = prepareWordDisplay(words, tags);

  it('matches each word against the canonical blend inventory, not a single fixed cluster', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      '[bl]ack',
      '[cl]ap',
      '[fr]og',
      '[gl]ad',
      '[pl]um',
      '[cr]ab',
      '[st]op',
      '[sw]im',
      '[sn]ack',
      '[tr]ain',
      '[gr]ass',
      '[dr]ip',
    ]);
  });

  it('re-opens a new group for every word, since none of these 12 blends repeat consecutively', () => {
    expect(result.map((r) => r.newGroup)).toEqual(new Array(12).fill(true));
  });
});

describe('prepareWordDisplay — ft-final-blend-words (consonant-blends, ft, final-blends)', () => {
  const tags = ['consonant-blends', 'ft', 'final-blends'];
  const words = ['craft', 'drift', 'gift', 'left', 'lift', 'loft', 'shift', 'soft', 'tuft'];
  const result = prepareWordDisplay(words, tags);

  it('highlights the ending blend', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'cra[ft]',
      'dri[ft]',
      'gi[ft]',
      'le[ft]',
      'li[ft]',
      'lo[ft]',
      'shi[ft]',
      'so[ft]',
      'tu[ft]',
    ]);
  });
});

describe('prepareWordDisplay — grade-1-ending-consonant-blends (mixed final blends, no per-blend tag)', () => {
  const tags = ['grade-1-core', 'ending-consonant-blends'];
  const words = ['hand', 'nest', 'jump', 'milk', 'belt', 'sink', 'desk', 'lamp', 'gift', 'cold', 'pond', 'help'];
  const result = prepareWordDisplay(words, tags);

  it('matches each word against the canonical ending-blend inventory, including the less common "lp" in help', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'ha[nd]',
      'ne[st]',
      'ju[mp]',
      'mi[lk]',
      'be[lt]',
      'si[nk]',
      'de[sk]',
      'la[mp]',
      'gi[ft]',
      'co[ld]',
      'po[nd]',
      'he[lp]',
    ]);
  });
});

describe('prepareWordDisplay — grade-3-prefix-words (prefixes)', () => {
  const tags = ['grade-3', 'prefixes', 'morphology', 'word-study'];
  const words = [
    'unfair', 'unhappy', 'unkind', 'unsafe', 'unlock',
    'redo', 'replay', 'reread', 'rewrite',
    'preview', 'predict',
    'disagree', 'dislike', 'discover', 'dishonest',
    'misplace', 'misread', 'misspell',
  ];
  const result = prepareWordDisplay(words, tags);

  it('highlights each real prefix (un-, re-, pre-, dis-, mis-), all in one list', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      '[un]fair', '[un]happy', '[un]kind', '[un]safe', '[un]lock',
      '[re]do', '[re]play', '[re]read', '[re]write',
      '[pre]view', '[pre]dict',
      '[dis]agree', '[dis]like', '[dis]cover', '[dis]honest',
      '[mis]place', '[mis]read', '[mis]spell',
    ]);
  });

  it('groups contiguously by prefix: un(5), re(4), pre(2), dis(4), mis(3)', () => {
    expect(result.map((r) => r.newGroup)).toEqual([
      true, false, false, false, false,
      true, false, false, false,
      true, false,
      true, false, false, false,
      true, false, false,
    ]);
  });

  it('prefers the longer "under" over the "un" it contains', () => {
    const synthetic = prepareWordDisplay(['undercover', 'unhappy'], tags);
    expect(synthetic.map((r) => render(r.segments))).toEqual(['[under]cover', '[un]happy']);
  });
});

describe('prepareWordDisplay — grade-3-suffix-words (suffixes)', () => {
  const tags = ['grade-3', 'suffixes', 'morphology', 'word-study'];
  const words = [
    'bigger', 'biggest', 'faster', 'fastest', 'easier', 'easiest',
    'slowly', 'nearly', 'really',
    'careful', 'helpful', 'useful',
    'careless', 'restless',
    'happiness', 'kindness',
    'movement', 'enjoyment',
  ];
  const result = prepareWordDisplay(words, tags);

  it('highlights only the trailing suffix letters, even across a doubled-consonant spelling change (bigger, biggest)', () => {
    expect(result.map((r) => render(r.segments))).toEqual([
      'bigg[er]', 'bigg[est]', 'fast[er]', 'fast[est]', 'easi[er]', 'easi[est]',
      'slow[ly]', 'near[ly]', 'real[ly]',
      'care[ful]', 'help[ful]', 'use[ful]',
      'care[less]', 'rest[less]',
      'happi[ness]', 'kind[ness]',
      'move[ment]', 'enjoy[ment]',
    ]);
  });

  it('groups by which suffix, matching the real, non-alphabetical word order', () => {
    expect(result.map((r) => r.newGroup)).toEqual([
      true, true, true, true, true, true, // er/est pairs alternate: none repeat consecutively
      true, false, false, // ly: slowly, nearly, really
      true, false, false, // ful: careful, helpful, useful
      true, false, // less: careless, restless
      true, false, // ness: happiness, kindness
      true, false, // ment: movement, enjoyment
    ]);
  });
});

describe('prepareWordDisplay — no recognized pattern', () => {
  it('falls back to a fully plain, ungrouped list', () => {
    const result = prepareWordDisplay(['information', 'technology'], ['grade-5', 'academic-words']);
    expect(result).toEqual([
      { word: 'information', segments: [{ text: 'information', highlight: false }], newGroup: false },
      { word: 'technology', segments: [{ text: 'technology', highlight: false }], newGroup: false },
    ]);
  });
});
