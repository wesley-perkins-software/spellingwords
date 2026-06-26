# Practice Session Page Specification

## Status

Draft — pending review against HOMEPAGE_SPEC.md, SITE_ARCHITECTURE.md, UX_ARCHITECTURE.md.

---

## Purpose

The Practice Session is the core product experience. Its purpose is simple: **help a child hear a word, spell it, receive calm feedback, and continue practicing.**

Every design decision on this page should serve that purpose. Nothing should compete with the spelling task. Nothing should make the child feel rushed, judged, or distracted. The session is a quiet, focused place to practice — not a game, not a quiz show, not a performance.

---

## Primary Audience

**Children ages 6–10** are the primary unmediated users of the Practice Session. This is the only page on the site where a child is likely to be using the product independently, without an adult mediating their experience.

This shapes everything: the clarity of feedback, the simplicity of the interaction, the emotional tone of the page, the forgiving nature of any mistakes.

**Secondary audiences** — parents nearby, teachers observing, older students (11+) — may be present or may use the session independently, but the page is designed first for young learners.

---

## Success Criteria

The Practice Session succeeds when:

- A child completes a full session without confusion about what to do next.
- A child who makes a mistake continues practicing without discouragement.
- A child who needs to hear a word again can replay it easily.
- A child finishes the session and understands they are done.
- A child or parent chooses to practice again — either the same list or a different one.

The session fails when:

- A child does not understand what is expected of them.
- A child feels embarrassed or punished for incorrect answers.
- A child is distracted by non-practice content (ads, navigation, notifications) during the spelling task.
- A child cannot replay a word when they need to hear it again.
- Technical issues (missing audio, invalid list data) leave the child stranded without a graceful resolution.

---

## Information Hierarchy

The practice interface should be weighted in the following order:

1. **The current word** — what the child is being asked to spell; visually dominant when revealed, absent before
2. **Audio** — the spoken word; always available, always foregrounded
3. **Typing** — the text input where the child spells the word; the primary interaction
4. **Feedback** — the calm, informative response to a completed attempt
5. **Progress** — how far through the session the child is; informative, not pressuring
6. **Session completion** — the end state, offering natural next steps

Nothing competes with the spelling task while it is active. The page should feel intentionally quiet. Children should never feel rushed.

---

## Required States

### Session Start

When a session begins, the child should understand immediately what is about to happen and what they need to do. The word being practiced is not revealed before the child hears it — the audio interaction is the beginning of each word's cycle.

The start state should:
- Confirm the list being practiced (title, word count)
- Make it clear how to begin (e.g., how to hear the first word)
- Require no explanation or instruction-reading from the child

For young children who cannot yet read fluently, the session design should not require them to read instructions to participate.

---

### Active Word

During the active word state, a single word is being practiced. The full interaction cycle for each word is:

1. The child hears the word spoken aloud
2. The child types what they heard
3. The child submits their answer
4. The child receives feedback

During this cycle, nothing else demands attention. Navigation, related content, and advertising (if present) must recede visually so that the spelling task is the only meaningful thing on the page.

---

### Replay

The child can replay the spoken word at any point before submitting an answer. Replay is always available, always obvious, and never limited in frequency.

Hearing a word multiple times is not a hint or an advantage — it is a fundamental accessibility feature. A child who needs to hear a word several times before attempting to spell it is practicing correctly, not cheating.

---

### Correct Answer

When a child spells a word correctly, the feedback should be:
- Clear (they know they were right)
- Calm (not overwhelming or performative)
- Brief (the session continues; this is not a celebration)

The correct answer itself should be shown or confirmed. Progress advances. The next word begins.

---

### Incorrect Answer

When a child spells a word incorrectly, the feedback should be:
- Clear (they know the attempt did not match)
- Supportive (the tone is "let's see the right spelling" not "you were wrong")
- Informative (the correct spelling is shown)
- Calm (no dramatic visual or audio signals of failure)

The session continues. The child is not penalized beyond seeing the correct answer. Depending on session configuration, the word may be re-queued for another attempt later in the session.

Incorrect answers must never feel like punishment. The emotional register of the incorrect state should be indistinguishable in tone from the correct state — only the content differs.

---

### Moving to the Next Word

After feedback is received, the child advances to the next word. This transition should be:
- Deliberate (the child initiates it, not an automatic timer)
- Clear (the child knows a new word is coming)
- Consistent (the same pattern repeats for every word in the session)

Children should never feel that the session is running away from them.

---

### Session Completion

When all words in the session have been practiced, the session is complete. The completion state should:
- Clearly signal that the session is finished
- Offer a brief, warm summary (words practiced, a calm acknowledgment of the work done)
- Provide natural next-step options: practice this list again, browse related lists, return to the library, or return to the homepage
- Never make the child feel that the session ended abruptly or without resolution

**What must never appear at completion:**
- Scores, grades, or pass/fail framing
- Streak counters or XP totals
- Pressure to immediately begin another session
- Advertising as the first thing the child sees after completing the session

---

### Exiting Early

A child (or parent) should be able to exit the session at any point without negative consequences. There is no penalty for stopping early. The session does not need to be completed to have value.

If localStorage tracking is active, partial progress may be recorded. The exit experience should be calm and clear, not a guilt-inducing "are you sure?" prompt.

---

### Invalid or Missing Data

When a session is initiated with invalid or missing list data (e.g., a malformed URL, an expired or empty session payload), the page must:
- Not crash or display a broken interface
- Display a clear, friendly explanation of what went wrong
- Offer a path back to the Spelling Library or the homepage

The child should never encounter a broken or confusing state without a way forward.

---

### Curated Sessions

When a session is launched from a List Detail page for a curated list, the session:
- Uses the canonical word list and example sentences from the content collection
- May offer audio example sentences if the content supports it
- Records progress against the list's permanent ID in localStorage (see CONTENT_ARCHITECTURE.md §6.2)

---

### Custom Sessions

When a session is launched from the homepage's custom word entry flow, the session:
- Uses the words as entered, after parse/validate/normalize processing
- Has no canonical ID and records no persistent progress
- May be ephemeral — the list exists only for the duration of the session
- Receives the same practice experience as curated sessions (audio, feedback, completion)

---

## Feedback Philosophy

Feedback in the Practice Session should always be:

- **Calm** — emotionally neutral in tone; neither elated nor deflated
- **Encouraging** — the implicit message is always "you can do this"
- **Supportive** — mistakes are learning moments, not failures
- **Informative** — the child always knows the correct spelling after an attempt
- **Brief** — feedback resolves quickly; the session continues

Feedback should never be:

- **Punishing** — no negative sound effects, alarm colors, or language that implies shame
- **Excessive in celebration** — confetti, animations, or fanfare that make correct answers feel like extraordinary events rather than normal progress
- **Comparative** — no scoring against a norm, no ranking, no comparison to previous sessions
- **Pressuring** — no countdowns, no streak warnings, no "don't break your streak" framing

The emotional target for every feedback state — correct and incorrect alike — is quiet encouragement.

---

## Audio Philosophy

Audio is not optional enhancement. It is the foundational mechanic of the practice session: the child cannot practice spelling a word they have not heard.

**Replay is always available.** There is no limit on how many times a child can hear a word. The replay affordance must be obvious at all times during the active word state.

**Pacing is child-controlled.** The session does not advance automatically after audio plays. The child controls when they are ready to type and when they are ready to move on. Automatic advancement would create timer-like pressure inconsistent with the product's values.

**Speech clarity matters.** When example sentences are available, hearing the word used in context helps children who struggle to identify a word from pronunciation alone. The spoken word and its example sentence should both be available during practice.

**Graceful fallback is required.** When `window.speechSynthesis` is unavailable or fails silently, the session must degrade gracefully. The child should see a clear indication that audio is unavailable and should be offered a path forward — either displaying the word visually or surfacing a helpful message. A broken session with no audio and no explanation is not acceptable.

---

## localStorage

The Practice Session may use localStorage for appropriate, privacy-respecting purposes.

**Appropriate uses:**

- Recording that a curated list has been practiced and when (for "recently practiced" features)
- Recording per-list progress data (words attempted, words correct) against the list's permanent ID
- Storing light preferences (e.g., preferred session size)
- Recording local achievements or acknowledgments tied to content metadata (see CONTENT_ARCHITECTURE.md §6.3)

**Not appropriate:**

- Cloud synchronization or cross-device progress
- User accounts or identity storage
- Streak tracking or streak-based pressure mechanics
- Any data collection that leaves the device

localStorage use on the Practice Session should be invisible to the child and unobtrusive for the parent. It exists to make returning visits more useful — not to create obligations or anxiety.

---

## SEO Role

The Practice Session has no SEO role.

It is a functional application page, not a content page. It does not need to rank in search results, attract new visitors, or demonstrate topical authority. Its URL structure and metadata should be minimal and appropriate, but SEO optimization of the Practice Session page is not a goal.

---

## AEO and GEO Role

The Practice Session has no direct AEO or GEO role.

AI systems should understand the practice experience at the product level (described in PRODUCT_VISION.md and surfaced on the homepage), not at the individual session URL level. The session page is not a meaningful target for AI citation or summarization.

---

## Advertising Philosophy

The Practice Session prioritizes learning above all else. Advertising is permitted, but only when it cannot interrupt, distract from, or compete with the spelling task.

**The guiding principle is not "no ads."**

**The guiding principle is: advertising must never compete with learning.**

**Acceptable approaches:**

- Unobtrusive placements in the desktop page frame (e.g., a sidebar that does not intrude on the practice area)
- Advertising positioned outside the active practice interface — in a margin, at the top before the session begins, or in the session completion state
- A modest, calm placement within the session summary after all words have been practiced

**What must never occur:**

- Advertising between words in the active session flow
- Advertising immediately adjacent to the typing input or the audio replay control
- Sticky or fixed-position ads that overlap or partially cover the practice interface
- Interstitial ads that appear between words or before the session begins
- Auto-playing audio or video advertising during an active session
- Layout shifts caused by advertising loading mid-session
- Any advertising that moves, flashes, or draws attention while the child is spelling

The emotional environment of the Practice Session is intentionally quiet and focused. Advertising that disrupts that environment undermines the product's core value and erodes trust with the parents and teachers who chose it specifically because it is calm.

---

## Anti-Goals

The Practice Session must never become:

- A game with points, levels, or achievement mechanics
- A quiz show with a host, countdown, or dramatic reveal
- A timed test — no timers active by default; pressure is antithetical to the product's purpose
- A dashboard with statistics, charts, or performance analytics displayed during practice
- A cluttered page with competing calls to action, navigation links, or promotional content visible during the spelling task
- A page where advertising competes with or interrupts the learning experience
- A page that punishes incorrect answers through sound, color, or language
- A page that requires accounts, cloud storage, or any form of identity to function

---

## Relationship to Other Pages

**Arrives from:** List Detail page (curated session), Homepage custom word entry (custom session), returning visitor shortcut from homepage or recently-practiced data.

**Routes to (on completion or exit):** List Detail page (practice again or return to list), Spelling Library (browse more lists), Homepage, or adjacent List Detail pages via related/next list recommendations.

**Does not replace:** The List Detail page is where lists are evaluated; the Practice Session is where they are practiced. These roles are distinct. The session does not need to re-explain what the list is or why it was chosen.
