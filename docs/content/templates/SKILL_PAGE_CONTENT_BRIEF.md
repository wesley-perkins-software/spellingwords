# Skill Page Content Brief

*Template. Copy this file, fill it in for one canonical Skill, and get it approved against the acceptance checklist in `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` §20 before drafting page prose. This is an editorial planning document, not a frontmatter worksheet — most fields are prose notes, not values you'll paste into `src/content/config.ts` fields. Where a field does map to an existing schema field, or has no current field at all, that's called out explicitly below.*

- **Canonical title:** *(must match `SKILLS_ARCHITECTURE.md` exactly — maps to the existing `title` field)*
- **Canonical id:** *(must match `skill-pages.md` exactly — maps to the existing `id`/`urlSlug` fields; never invent or change)*
- **Skill family:** *(one of the 12 frozen families — editorial context only, no dedicated field; the Skills Hub grouping in `src/lib/content/spellingSkills.ts` is the actual code-level home for family membership)*
- **Instructional variant:** *(1–4 or Hybrid, per the Standard §21 mapping table — editorial planning only, no schema field)*
- **Parent Skill family:** *(the family this Skill belongs under, for the "family context" mention in prose — editorial only)*
- **Skills Hub destination:** *(confirm this Skill is already listed in `SPELLING_SKILL_FAMILIES` — a repository-capability check, not something the brief changes)*
- **Related Grade Units:** *(list the Grade Unit ids expected to declare this Skill in their own `skillIds` — informational for the brief; the actual link is stored on each Grade Unit, never on the Skill itself, and is derived in reverse at render time. Do not plan to add a `skillIds` value to this Skill's own frontmatter — that field does not exist on Skills.)*
- **Primary audience:** *(parent / teacher / tutor — whoever this page is written to)*
- **Primary search intent:** *(the one question this page must answer first)*
- **Secondary intents:** *(other real questions this page can also satisfy)*
- **One-sentence learner competency:** *(what a child who has this concept secure can do)*
- **Conceptual scope:** *(what this Skill covers — be specific)*
- **Out-of-scope concepts:** *(what a reader might expect but this page should not cover, and why — often points to a sibling Skill or a Grade Unit instead)*
- **Direct-answer requirements:** *(what the `shortAnswer` field must communicate — maps to the existing `shortAnswer` field)*
- **Immediate instructional resource:** *(brief description of the planned demonstration set + instructional example system, per Standard §5)*
- **Demonstration set:** *(the small, controlled word list — maps to the existing `words` field; note current vs. recommended if auditing an existing page)*
- **Instructional example groupings:** *(how the fuller body examples will be grouped — sound, spelling, condition, family, meaning, etc., per Standard §8; this is Markdown body content, no dedicated field)*
- **Core explanation:** *(the concept explanation plan — Markdown body content)*
- **What the learner should notice:** *(the explicit attention-directing statement plan — Markdown body content)*
- **Essential distinction:** *(Level 1, per Standard §9, if one exists for this concept — Markdown body content)*
- **Common exceptions:** *(Level 2, per Standard §9 — Markdown body content)*
- **Advanced nuance, if needed:** *(Level 3, per Standard §9 — Markdown body content, keep brief)*
- **Primary teaching routine:** *(the single routine, per Standard §10 — Markdown body content)*
- **Diagnostic response:** *(how the page guides an adult to help a struggling learner isolate the difficulty, per Standard §10 — Markdown body content)*
- **Signs the skill is becoming secure:** *(the closing observable-evidence section, per Standard §11 — Markdown body content; do not plan to populate this from the `readinessSignals` field, which is atypical for Skills — see Standard §11)*
- **Canonical internal links:** *(list each planned `relatedLists`/`prerequisiteLists`/`nextLists` entry with the reason it belongs, per Standard §12 — maps to those existing fields)*
- **FAQ candidates:** *(0–5 draft questions — maps to the existing `faq` field)*
- **FAQ justification:** *(for each candidate, which Standard §13 test it passes)*
- **Claims requiring verification:** *(anything on the Standard §14 evidence ladder above "basic linguistic description")*
- **Sources:** *(internal notes only — see Standard §14 on restrained public sourcing; this section may be fuller than anything published on the page itself)*
- **Metadata recommendation:** *(confirm planned `title`/`description` follow Standard §17; no new fields needed)*
- **Structured-data notes:** *(confirm no live schema changes are implied; flag anything that depends on the Standard §18 future-implementation gaps rather than assuming they exist)*
- **Visual opportunities for a later phase:** *(anything that would benefit from a diagram, table component, or other presentation upgrade beyond current Markdown rendering — explicitly out of scope for the page draft itself)*
- **Duplication risks:** *(specific check against the corresponding Grade Unit page(s) named above, per Standard §2/§5 — not a generic "we'll avoid duplication" note)*
- **Editorial status:** *(Not started / Drafting / Needs review / Approved — see `docs/content/inventory/skill-pages.md`'s Content brief status column, kept distinct from that file's separate Editorial status column)*
