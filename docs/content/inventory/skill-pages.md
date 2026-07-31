# Inventory: Skill Pages (Canonical Active)

Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. Every page below is explicitly defined by `docs/architecture/SKILLS_ARCHITECTURE.md`'s frozen 41-slot taxonomy, verified against `src/lib/content/spellingSkills.ts`. All 41 slots are canonical active by construction — none of this layer is legacy.


## Short Vowels and CVC Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| short-a-words | Short A Words | short-a-words | 1 | `src/content/spelling-lists/phonics/short-a-words.md` | Complete |
| short-e-words | Short E Words | short-e-words | 1 | `src/content/spelling-lists/phonics/short-e-words.md` | Complete |
| short-i-words | Short I Words | short-i-words | 1 | `src/content/spelling-lists/phonics/short-i-words.md` | Complete |
| short-o-words | Short O Words | short-o-words | 1 | `src/content/spelling-lists/phonics/short-o-words.md` | Complete |
| short-u-words | Short U Words | short-u-words | 1 | `src/content/spelling-lists/phonics/short-u-words.md` | Complete |

### Audit notes (Phase 1, Batch 1 — Short Vowels and CVC Words)

Primary search/answer intent recorded per page, all served by the visible `shortAnswer` card plus a matching FAQPage entry (verified in the built output):

- **short-a-words** — "what is short A / why is it an early pattern" + "does silent-e change it automatically." Reference implementation; audited and given one fix (a genuine FAQ/body duplication on the short-a-vs-long-a point, and a missing `silent-e-long-a` relatedLists link that its E/I/O/U siblings already had).
- **short-e-words** — "what is the short e sound" + "sounded out or memorized." The e/i confusable-vowel explanation lives once, in the body, not duplicated in FAQ.
- **short-i-words** — same two topics, plus a third FAQ specific to this page's one spelling wrinkle ("fish" / the sh digraph).
- **short-o-words** — same two topics, plus "how is short o different from short u" (the family's other real confusable pair, alongside e/i).
- **short-u-words** — same two topics, plus the reciprocal "short u vs short o" question and the "duck"/"rock" ck-ending cross-reference.

Verified for all five: tests (`npm test`, 516/516) and build (`npm run build`, 280 pages) pass; each page's "Where this fits in the curriculum" card resolves to a real, published Kindergarten Grade Unit (previously zero for E/I/O/U — see roadmap note below); FAQPage structured data present and non-empty; manually reviewed at 1280px and 390px viewports.

## Consonant Digraphs

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| digraph-ch-words | CH Digraph Words | digraph-ch-words | 1 | `src/content/spelling-lists/phonics/digraph-ch-words.md` | Not audited |
| digraph-sh-words | SH Digraph Words | digraph-sh-words | 1 | `src/content/spelling-lists/phonics/digraph-sh-words.md` | Not audited |
| digraph-th-words | TH Digraph Words | digraph-th-words | 1 | `src/content/spelling-lists/phonics/digraph-th-words.md` | Not audited |
| digraph-wh-words | WH Digraph Words | digraph-wh-words | 1 | `src/content/spelling-lists/phonics/digraph-wh-words.md` | Not audited |

## Consonant Blends

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| beginning-blends | Beginning Blends | beginning-blends | 1 | `src/content/spelling-lists/phonics/beginning-blends.md` | Not audited |
| ending-blends | Ending Blends | ending-blends | 1 | `src/content/spelling-lists/phonics/ending-blends.md` | Not audited |

## Common Spelling Patterns

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| ck-tch-dge-word-endings | CK, Double Letters, and TCH/DGE Word Endings | ck-tch-dge-word-endings | 1 | `src/content/spelling-lists/phonics/ck-tch-dge-word-endings.md` | Not audited |
| silent-letters | Silent Letters | silent-letters | 2 | `src/content/spelling-lists/grade-level/silent-letters.md` | Not audited |
| soft-c-soft-g | Soft C and Soft G | soft-c-soft-g | 2 | `src/content/spelling-lists/phonics/soft-c-soft-g.md` | Not audited |

## Silent E

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| silent-e-long-a | Long A Silent E Words | silent-e-long-a | 1 | `src/content/spelling-lists/phonics/silent-e-long-a.md` | Not audited |
| silent-e-long-i | Long I Silent E Words | silent-e-long-i | 1 | `src/content/spelling-lists/phonics/silent-e-long-i.md` | Not audited |
| silent-e-long-o | Long O Silent E Words | silent-e-long-o | 1 | `src/content/spelling-lists/phonics/silent-e-long-o.md` | Not audited |
| silent-e-long-u | Long U Silent E Words | silent-e-long-u | 1 | `src/content/spelling-lists/phonics/silent-e-long-u.md` | Not audited |

## Vowel Teams

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| vowel-teams-ai-ay | AI and AY Words | vowel-teams-ai-ay | 1 | `src/content/spelling-lists/phonics/vowel-teams-ai-ay.md` | Not audited |
| vowel-teams-ee-ea | EE and EA Words | vowel-teams-ee-ea | 1 | `src/content/spelling-lists/phonics/vowel-teams-ee-ea.md` | Not audited |
| vowel-teams-oa-ow | OA and OW Words | vowel-teams-oa-ow | 1 | `src/content/spelling-lists/phonics/vowel-teams-oa-ow.md` | Not audited |
| oi-and-oy-words | OI and OY Words | oi-and-oy-words | 2 | `src/content/spelling-lists/phonics/oi-and-oy-words.md` | Not audited |
| ou-and-ow-words | OU and OW Words | ou-and-ow-words | 2 | `src/content/spelling-lists/phonics/ou-and-ow-words.md` | Not audited |
| oo-words | OO Words | oo-words | 2 | `src/content/spelling-lists/phonics/oo-words.md` | Not audited |
| au-and-aw-words | AU and AW Words | au-and-aw-words | 2 | `src/content/spelling-lists/phonics/au-and-aw-words.md` | Not audited |
| ie-and-igh-words | IE and IGH Words | — | — | **No content file exists** | **Blocked — content-pending.** Taxonomy slot is frozen; a word bank must be authored before any editorial checklist applies. |

## R-Controlled Vowels

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| r-controlled-ar | R-Controlled AR Words | r-controlled-ar | 1 | `src/content/spelling-lists/phonics/r-controlled-ar.md` | Not audited |
| r-controlled-or | R-Controlled OR Words | r-controlled-or | 1 | `src/content/spelling-lists/phonics/r-controlled-or.md` | Not audited |
| r-controlled-er-ir-ur | R-Controlled ER, IR, and UR Words | r-controlled-er-ir-ur | 1 | `src/content/spelling-lists/phonics/r-controlled-er-ir-ur.md` | Not audited |

## Multisyllabic Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| multisyllabic-words | Multisyllabic Words | multisyllabic-words | 2 | `src/content/spelling-lists/phonics/multisyllabic-words.md` | Not audited |

## Word Building and Endings

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| plurals | Plural Words with -s and -es | plurals | 1 | `src/content/spelling-lists/grade-level/plurals.md` | Not audited |
| ed-and-ing | Words Ending in -ed and -ing | ed-and-ing | 1 | `src/content/spelling-lists/phonics/ed-and-ing.md` | Not audited |
| common-suffixes | Common Suffixes | common-suffixes | 3 | `src/content/spelling-lists/grade-level/common-suffixes.md` | Not audited |
| suffix-spelling-changes | Spelling Rules for Adding Suffixes | suffix-spelling-changes | 3 | `src/content/spelling-lists/grade-level/suffix-spelling-changes.md` | Not audited |
| compound-words | Compound Words | compound-words | 2 | `src/content/spelling-lists/grade-level/compound-words.md` | Not audited |
| contractions | Contractions | contractions | 2 | `src/content/spelling-lists/grade-level/contractions.md` | Not audited |

## Prefixes

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| un-and-re-prefixes | Un- and Re- Prefixes | un-and-re-prefixes | 2 | `src/content/spelling-lists/grade-level/un-and-re-prefixes.md` | Not audited |
| common-prefixes | Common Prefixes | common-prefixes | 3 | `src/content/spelling-lists/grade-level/common-prefixes.md` | Not audited |

## Greek and Latin Roots

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| greek-and-latin-roots | Greek and Latin Roots | greek-and-latin-roots | 4 | `src/content/spelling-lists/grade-level/greek-and-latin-roots.md` | Not audited |

## Homophones and Commonly Confused Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status |
|---|---|---|---|---|---|
| homophones | Homophones | homophones | 2 | `src/content/spelling-lists/grade-level/homophones.md` | Not audited |
| commonly-confused-words | Commonly Confused Words | commonly-confused-words | 4 | `src/content/spelling-lists/grade-level/commonly-confused-words.md` | Not audited |

## Unresolved: pages tagged `contentRole: skill` outside the frozen taxonomy

These are **not** part of the canonical Skill-page checklist and are not counted in the 41 slots above. Full detail and classification reasoning in `untagged-and-data-quality.md`. Do not add editorial checklists to these until a product-owner decision resolves their status.

| id | Title | Category | Grade | Source file |
|---|---|---|---|---|
| silent-e-long-e | Long E Silent E Words | phonics | 1 | `src/content/spelling-lists/phonics/silent-e-long-e.md` |
| grade-4-final-stable-syllables | 4th Grade Final Stable Syllables: -ture and -sure | grade-level | 4 | `src/content/spelling-lists/grade-level/4th-grade-final-stable-syllables.md` |
| grade-5-spelling-rules | 5th Grade Spelling Rules | grade-level | 5 | `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md` |

**Totals:** 12 families · 41 taxonomy slots (40 live + 1 provisional) · 40 canonical-active Skill pages · 3 unresolved skill-tagged pages outside the taxonomy.

