# Learning Model: Collections vs. Sessions

This document defines how spellingwords distinguishes between **canonical word
collections** and **practice sessions**, and records the decisions that follow
from that distinction. It exists so that future content and features are built
on a consistent educational model rather than ad hoc choices made list by list.

## Core distinction

- **Collection** — a canonical, ordered reference list of words (e.g., "Dolch
  First Grade Sight Words," 41 words). A collection is authored once and
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

4. **"Review missed" is headed toward first-class status.**
   Reviewing words a learner got wrong is a natural, high-value session type —
   arguably more valuable than grinding through an entire collection again. It
   currently exists as a post-session action; over time it should become a
   session type a learner can choose directly, alongside quick practice and
   full-collection practice.

5. **Example sentence behavior is intentionally deferred.**
   Words in collections may carry an `exampleSentence`. Whether and how that
   sentence is surfaced during a practice session (spoken automatically,
   available on request, shown as text, etc.) is **not yet decided**. This is
   a deliberate placeholder — the goal is to settle the Collection/Session
   model first, observe how real sessions feel, and only then design the
   sentence experience so it fits the session model rather than being bolted
   onto the old "test the whole list" flow.

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
- Don't assume `exampleSentence` (or `hint`) will be surfaced during practice
  yet — they remain useful editorial context and may power a future feature,
  but no session currently displays or speaks them.

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
