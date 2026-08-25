# Learning Model: Collections vs. Sessions

This document defines how spellingwords distinguishes between **canonical word
collections** and **practice sessions**, and records the decisions that follow
from that distinction. It exists so that future content and features are built
on a consistent educational model rather than ad hoc choices made list by list.

## Core distinction

- **Collection** — a canonical, ordered reference list of words (e.g., "1st
  Grade High-Frequency Words 1," 12 words). A collection is authored once and
  describes *what vocabulary this topic covers*. Its size is a fact about the
  content, not an instruction about how much to practice at once.
- **Session** — a bounded set of words a learner actually practices in one
  sitting. A session is drawn *from* a collection and is sized for sustained
  attention, not for completeness.

Collections and sessions are different things. A 41-word collection does not
imply a 41-word session, in the same way a textbook chapter doesn't imply
reading it in one sitting.

## Decisions in effect

1. **Canonical lists are reference collections, not session scripts.**
   A list page communicates the scope of a topic ("41 words in this
   collection"). It is a map of the content, not a queue the learner is
   expected to clear in one go.

2. **Practice sessions are bounded by default.**
   The default session size for curated library lists is **10 words**. This
   keeps a sitting short enough to match the attention span of the app's core
   audience (roughly ages 6–10) while still being a meaningful amount of
   practice.

3. **Practicing the full collection is an explicit opt-in.**
   Learners (or the parents/teachers guiding them) can still choose to work
   through an entire collection — but they choose it deliberately (e.g.,
   "Practice all 41 words"), rather than having it be the only or default path.

4. **"Review missed" is a first-class results action.**
   Reviewing words a learner got wrong is a natural, high-value session type —
   arguably more valuable than grinding through an entire collection again. On
   the results screen, "Practice missed words" starts a new session containing
   only the words missed in the previous pass (via the state machine's
   `reviewMissed()` action), preserving each word's original sentence and hint
   data. Missed words never re-enter the queue mid-session — they are only
   ever collected into `result.missedWords` and offered as this explicit
   follow-up session once the original pass is complete.

5. **Example sentences are spoken automatically, on a deliberate delay.**
   When a word carries an `exampleSentence`, the practice session speaks the
   word immediately on arrival, then — after a short pause (1 second) so the
   two utterances don't overlap or blur together — speaks the sentence too.
   This is core to the "listen, then type" pedagogy, not incidental autoplay:
   the word's pronunciation is the primary information a learner needs before
   typing, and it is available the moment a question appears, without
   requiring an extra tap. Learners can always replay either the word or the
   sentence on demand via the "Hear word" / "Hear sentence" controls.

6. **No gamification.**
   The learning model does not include experience points, streaks, badges,
   leaderboards, or accounts. Motivation comes from short, achievable practice
   sessions and clear feedback — not from extrinsic reward systems. This is a
   deliberate scope boundary, not an oversight.

## What this means for content authoring

When authoring a new collection:

- Write it as a complete, well-ordered reference list for its topic. Don't
  artificially shrink it to "session size" — collection size should reflect
  the vocabulary, not the practice format.
- Word order matters: curated collections are typically taught in a rough
  frequency or difficulty order, so the first N words of a collection form a
  reasonable default "quick practice" session.
- `exampleSentence` is spoken automatically during practice (see decision 5)
  whenever a word has one — write sentences with that in mind. `hint` is not
  yet surfaced anywhere in the play experience.

## What this means for the play experience

- A session is a subset of a collection's words, not necessarily the whole
  collection.
- The default entry point into a curated collection should offer a short,
  bounded session (10 words) rather than the full list.
- A full-collection run-through remains available, but as a clearly secondary,
  explicitly chosen option.
- Custom (user-pasted) word lists are a different use case — the learner
  supplies the exact words they want to practice, so the entire pasted list is
  the session by definition. The Collection/Session distinction applies to
  curated library content, not to custom lists.
- A practice session carries lightweight provenance (`PracticeSource`, see
  `src/types/spelling.ts` and `src/lib/content/practiceSource.ts`) describing
  the exact Core unit / HFW set / Themed list / Skill page it was launched
  from, if any. This drives "← Return to {source}" navigation on the ready
  and results screens, and (for Core and HFW sources only, which have real
  sequencing) a "Continue to next unit/set" progression action on a perfect
  score. A non-perfect score never offers next-unit/set progression,
  regardless of whether the source has one — the priority there is
  practicing the missed words, not moving on. Custom sessions carry no
  return destination and are never given a forced generic one.
