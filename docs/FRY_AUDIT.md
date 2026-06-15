# Fry Words Audit

## Purpose

This document audits the Fry high-frequency word list against the current
spellingwords.app word universe. Its goals are narrow and editorial:

- understand where Fry overlaps with the words we already support,
- identify the gaps Fry exposes,
- record words that are intentionally excluded by existing policy, and
- guide future editorial expansion — especially in the thin grade 4–5 band.

This is an audit, not an expansion. **No words are added here.** No sentence
bank entries, curated lists, code, tests, or UI are touched by this task. The
candidate sections below are planning notes only.

The Fry list itself is an external reference. In keeping with the source-use
policy in `docs/SOURCE_MAP.md`, this document does **not** reproduce the Fry
lists verbatim. It describes overlap and gaps in prose, using occasional
representative examples for illustration only.

Fry is being used the same way Reading Rockets and Dolch were used before it:
as a vocabulary coverage reference. The sentence bank remains the canonical
source of truth; Fry simply tells us where our coverage is strong and where it
thins out.

---

## Current Universe Reference

The canonical inventory is the sentence bank (`src/lib/sentenceBank/data/`),
summarized for humans in `docs/WORD_CATALOG.md` and described strategically in
`docs/WORD_UNIVERSE.md` and `docs/SOURCE_MAP.md`. Words live in one of three
grade bands — K–1, 2–3, and 4–5 — and each word exists exactly once. Heteronyms
(`live`, `read`, `wind`, `tear`, `lead`, `row`, `close`, `bow`, `sow`, `wound`,
`minute`) are now first-class spelling-only entries carrying no example
sentence; they are included in the universe and were considered present for the
purposes of this comparison.

### Documented vs. actual counts (a recorded discrepancy)

The published docs and the live data no longer agree on the size of the
universe. This audit records the drift but does **not** reconcile it — fixing it
is out of scope.

| Band      | Documented (WORD_CATALOG / WORD_UNIVERSE) | Actual (sentence bank data) |
|-----------|------------------------------------------:|----------------------------:|
| K–1       |                                       347 |                         352 |
| Grade 2–3 |                                       486 |                         497 |
| Grade 4–5 |                                        81 |                          83 |
| **Total** |                                   **914** |                     **932** |

The live sentence bank holds 18 more entries than the docs report (+5 in K–1,
+11 in 2–3, +2 in 4–5). Because `docs/WORD_CATALOG.md` is the reference set this
audit compared against, the comparison is anchored to the documented inventory;
a small number of recently added words may already cover gaps noted below. The
documentation should be refreshed in a separate task.

Throughout this audit, "covered" means the word (or an obvious inflectional
relative we already support, e.g. *planet* for *planets*) appears in the current
catalog.

---

## Fry Coverage Sections

Fry orders its 1,000 words by descending frequency, in blocks of one hundred.
Each block below was compared word-by-word against `docs/WORD_CATALOG.md`. The
status reflects what that comparison found, not an assumption about the block.

### Fry 1–100

**Coverage status: Strong.**

**Observations.** These are the most frequent words in written English —
function words, pronouns, and the earliest content words. Essentially all of
them are present in the K–1 band, and the handful of content words in this
block (*water*, *number*, *people*, *part*, *word*, *oil*, *call*, *find*) are
already supported. This block is effectively saturated. Fry adds nothing here
that we lack.

### Fry 101–200

**Coverage status: Strong.**

**Observations.** Still dominated by high-frequency function and early content
words (*place*, *year*, *thing*, *help*, *show*, *answer*, *picture*, *study*).
Nearly all are present across K–1 and 2–3. The one notable absence is *America*,
which is intentionally excluded as a proper noun (it is tracked as `avoid` in
the review registry). No meaningful coverage gap.

### Fry 201–300

**Coverage status: Strong.**

**Observations.** Coverage remains high. Most of this block is everyday
vocabulary already in the bank (*country*, *school*, *father*, *example*,
*important*, *family*, *mountain*). The first culturally-specific proper-noun
exclusions appear here (*Indian*), and a few connective adverbs (*sometimes*
versus our *sometime*) are near-misses rather than true gaps. Coverage is strong
with only incidental absences.

### Fry 301–400

**Coverage status: Partial.**

**Observations.** This is where the first real gaps emerge. Common words are
still well covered, but a distinct cluster of school/academic vocabulary is
missing: *area*, *complete*, *measure*, *pattern*, *vowel*, *numeral*, *unit*,
*figure*, *certain*, *notice*, *travel*. These are content-area and instructional
words that Reading Rockets and Dolch did not push us to add. The block marks the
transition from "function words" to "things children read about in lessons."

### Fry 401–500

**Coverage status: Partial.**

**Observations.** Everyday narrative words remain covered (*road*, *wait*,
*person*, *strong*, *street*, *ocean*, *class*), but the academic cluster grows:
*verb*, *noun*, *fact*, *contain*, *surface*, *produce*, *machine*, *system*,
*force*, *common*, *explain*, *language*, *government*, *object*, *power*,
*material*, *include*, *circle*. This block is roughly half general vocabulary
(covered) and half subject-matter vocabulary (largely missing).

### Fry 501–600

**Coverage status: Partial.**

**Observations.** Daily-life and feeling words are well represented (*felt*,
*ready*, *believe*, *love*, *summer*, *winter*, *beautiful*, *happy*, *teacher*,
*clothes*). The gaps are again academic and quantitative: *square*, *direction*,
*center*, *divided*, *general*, *energy*, *subject*, *region*, *difference*,
*distance*, *length*, *record*, *describe*, *represent*, *paragraph*. The
pattern from the previous two blocks holds — narrative vocabulary in, content
vocabulary out.

### Fry 601–700

**Coverage status: Partial.**

**Observations.** A mix. Many concrete, child-friendly words are present
(*sleep*, *ride*, *floor*, *hill*, *baby*, *bed*, *spring*, *lake*, *gold*,
*stone*, *trip*, *hole*, *surprise*, *dress*). Missing words trend abstract or
technical: *appear*, *metal*, *result*, *century*, *phrase*, *temperature*,
*method*, *section*, *consonant*, *dictionary*, *amount*, *possible*, *natural*,
*angle*, *fraction*, *exactly*, *remain*. Coverage is thinner than the early
blocks but not yet sparse.

### Fry 701–800

**Coverage status: Weak.**

**Observations.** The balance tips. While some common words remain (*catch*,
*wrote*, *grass*, *brown*, *party*, *clean*, *shoes*, *afraid*, *office*), the
majority of this block is upper-elementary, instructional, or abstract:
*continued*, *design*, *experiment*, *engine*, *information*, *express*,
*equal*, *decimal*, *control*, *practice*, *report*, *statement*, *suffix*,
*adjective*, *similar*, *experience*, *allow*, *workers*. Proper nouns also
cluster here (*England*, *Washington*, *Greek*). This is the first block where
missing words outnumber covered ones.

### Fry 801–900

**Coverage status: Weak.**

**Observations.** Predominantly content-area and conceptual vocabulary, most of
which we do not carry: *comma*, *silent*, *compare*, *poem*, *elements*,
*indicate*, *sense*, *value*, *movement*, *position*, *consider*, *suggested*,
*process*, *property*, *particular*, *current*, *industry*, *capital*,
*triangle*, *molecules*, *column*. Covered words are the exception rather than
the rule, and several proper nouns appear (*Japanese*, *France*). Clearly a
gap-heavy block.

### Fry 901–1000

**Coverage status: Weak.**

**Observations.** The least frequent and most abstract decile. It is dense with
academic, scientific, and analytical vocabulary that has no presence in the
current bank, alongside lower-frequency descriptive and conceptual words. This
is exactly the register the universe is thinnest in. Overlap with the catalog is
minimal, and what little exists tends to be incidental rather than systematic.

---

## Missing Vocabulary Themes

The gaps Fry exposes are not random; they cluster into recognizable themes.
Identifying the themes is more useful than enumerating the words.

- **Upper-elementary vocabulary.** The clearest pattern. The current universe is
  strong through roughly the first 300 Fry words (early reading) and thins
  steadily afterward. The grade 4–5 band — already the smallest at 81–83 entries
  — is precisely where Fry's middle and upper blocks would land.

- **Academic and instructional vocabulary.** Words children meet *in lessons
  about reading and writing*: *vowel*, *consonant*, *syllable*, *noun*, *verb*,
  *adjective*, *suffix*, *paragraph*, *sentence*, *describe*, *compare*,
  *indicate*. Many are meta-language about literacy itself.

- **Content-area words.** Math, science, and social-studies vocabulary:
  *area*, *measure*, *fraction*, *decimal*, *angle*, *triangle*, *energy*,
  *temperature*, *experiment*, *molecules*, *region*, *government*, *capital*,
  *industry*. These were never surfaced by Dolch or phonics work.

- **Morphology-derived words.** Inflected and derived forms that Fry lists as
  separate entries (*continued*, *covered*, *developed*, *workers*, *factories*)
  and word families where we hold the root but not the relatives. This theme
  points toward future morphology-driven lists rather than one-off additions.

- **Abstract concepts.** Lower-frequency words naming ideas rather than things:
  *difference*, *distance*, *value*, *sense*, *position*, *result*, *method*,
  *possible*, *certain*, *common*. Harder to illustrate in a calm,
  child-friendly sentence, and worth approaching deliberately.

---

## Candidate Expansion Queue

Planning only. Nothing below is added to the bank in this task; these are
high-level categories and representative examples to inform future editorial
sessions.

### Safe Future Additions

Concrete, low-risk vocabulary that fits the existing tone and is easy to use in
a calm example sentence:

- **Everyday content words** already validated by frequency and easy to picture
  — e.g. *area*, *complete*, *measure*, *travel*, *appear*, *metal*, *engine*,
  *century*.
- **Common feeling and action words** from the middle blocks that simply were
  not reached yet.
- **High-frequency grade 4–5 vocabulary** that directly addresses the thin band,
  drawn from Fry blocks 300–600 where words are still concrete.

These are categories, not a finalized list — each candidate still needs an
editorial sentence and grade-band decision when expansion actually happens.

### Needs Review

Themes that require a policy or editorial decision before any word is added:

- **Literacy meta-language** (*vowel*, *consonant*, *syllable*, *noun*, *verb*,
  *adjective*, *suffix*) — useful, but need a consistent stance on whether the
  app teaches *about* spelling or just practices it.
- **Heteronyms and homographs** surfaced by Fry (*record*, *object*, *present*,
  *desert*) — these intersect the existing heteronym policy and must be handled
  as spelling-only entries where pronunciation is ambiguous.
- **Inflected/derived forms** (*continued*, *covered*, *factories*) — decide per
  the duplicate and morphology rules whether to add the form or rely on the root.
- **Abstract concepts** that are hard to put in a concrete, reassuring sentence
  (*difference*, *value*, *sense*, *method*).

### Avoid

Categories already excluded by `docs/CONTENT_STANDARDS.md` and the review
registry. Fry contains a number of these; they should not enter the bank:

- **Proper nouns** — *America*, *England*, *France*, *Washington*, *Indian*,
  *Japanese*, *Greek*, *Europe*, *Africa* and similar.
- **Honorifics and abbreviations** — consistent with the existing `avoid`
  entries for *Mr.*, *Mrs.*, *Ms.*
- Anything else conflicting with the standing content standards.

---

## Findings

- **Overlap is concentrated in the lower blocks.** Fry 1–300 is essentially
  fully covered; the universe already holds the highest-frequency English
  vocabulary. Fry confirms our early-reading coverage is strong.

- **Coverage degrades predictably with frequency.** Blocks shift from Strong
  (1–300) to Partial (301–700) to Weak (701–1000) as everyday words give way to
  academic, content-area, and abstract vocabulary.

- **Grade 4–5 remains the thinnest area.** At 81–83 entries it is the smallest
  band, and it is exactly where the missing Fry vocabulary belongs. This audit
  reinforces grade 4–5 as the highest-priority expansion target.

- **Fry is likely to contribute more upper-elementary vocabulary than Reading
  Rockets.** Reading Rockets anchored K–3 narrative vocabulary; Fry's middle and
  upper blocks point squarely at the instructional and content-area words that
  upper-elementary lists need.

- **Expansion should be gradual and editorial.** The gaps are real but large.
  They should be filled deliberately — concrete words first, with hand-written
  sentences and grade-band decisions — not in bulk. The candidate queue above is
  a starting point, not a backlog to clear at once.

### Surprising findings

- The documented universe size (914) no longer matches the live sentence bank
  (932). The drift is small but should be reconciled in the docs so future
  audits compare against accurate counts. Recorded here; not fixed in this task.
- The transition from "covered" to "not covered" is unusually clean — it tracks
  word *frequency* almost directly, which means a frequency-ordered source like
  Fry is a particularly good roadmap for sequencing future additions.
