# Launch accessibility verification

**Review date:** 2026-08-21  
**Scope:** production Astro templates after the supporting-page and global-navigation implementation  
**Outcome:** an accurately limited `/accessibility` statement is ready to publish; no WCAG conformance level or certification is claimed

## Methods completed

- Reviewed the shared `Layout.astro` for language, viewport, page title/description, semantic body structure, and the skip link.
- Reviewed `SiteHeader.astro` and `SiteFooter.astro` for landmarks, accessible names, disclosure state, DOM order, target sizing, visible-focus styles, Escape behavior, and focus return.
- Reviewed About, Curriculum, Accessibility, 404, homepage, Grade Hub, Skills Hub, Grade Unit, Skill, and practice templates for one main landmark, one primary heading, labeled regions, link purpose, control names, and status/error announcements.
- Verified the practice state code deliberately moves focus to the answer, continue, retry, and choose-list controls as screens change.
- Verified reduced-motion handling globally and confirmed that content does not depend on animation.
- Ran the repository's programmatic contrast test over the production Direction A tokens.
- Built all production routes and inspected representative generated HTML alongside the shared source templates for landmark, heading, control-name, and image-alternative behavior.
- Added source-contract tests for canonical Grade destinations and disclosure/Escape/focus-return behavior.

## Verified implementation facts suitable for the public statement

- Every production page uses a shared skip link to `#main-content`.
- Global navigation is exposed through native links, buttons, and a native mobile Grades disclosure; it does not require hover.
- Desktop Grades and mobile navigation controls expose `aria-expanded`/`aria-controls`; Escape closes an open panel and returns focus to its controlling button.
- Core navigation and practice targets are at least 44 CSS pixels high where practical.
- Practice inputs have accessible names. Errors, progress, unavailable-sentence messages, and answer feedback use live regions/status semantics.
- The practice state machine moves focus as the active screen changes rather than leaving focus in hidden content.
- Correct/incorrect states include words and symbols, not color alone.
- A global `prefers-reduced-motion: reduce` rule minimizes animation and transition duration.
- Production Direction A color pairs covered by `contrast.test.ts` meet their encoded contrast thresholds.

## Known limitations and boundaries

1. Practice requires browser speech synthesis. Available voices, pronunciation quality, and local-versus-network processing vary by browser, operating system, and installed voice; the application cannot normalize all of those differences.
2. This was an internal product/engineering review, not an audit or certification by an independent accessibility specialist. It does not establish or claim WCAG A/AA/AAA conformance.
3. There is no public accessibility-feedback channel. The public statement says so directly instead of inventing an email address or form.
4. Automated browser execution, screenshots, 200% zoom observation, and screen-reader smoke testing could not be completed in this container because no browser executable is installed and the Playwright Chromium download endpoint returned HTTP 403. These remain release-environment checks; the public statement does not claim that a named browser/screen-reader matrix was tested.
5. Browser speech output is inherently audio-first. The practice interface provides written instructions and feedback, but the core “hear a word and spell it” task is not equivalent without audio. The unsupported-browser state explains this dependency.

## Publication decision

Publish `/accessibility` now because it owns a distinct trust/accessibility purpose and its claims are limited to implementation facts verified above. Keep the internal-review date, the absence of a conformance claim, speech dependency, and unavailable feedback channel visible. Revisit the statement after browser zoom/screen-reader checks, any public feedback channel, or a material practice/navigation change.

## Required release follow-up

- Run keyboard-only navigation at desktop and 375px mobile widths in a browser.
- Inspect at 200% and 400% zoom, including the sticky header, open mobile menu, supporting-page cards, footer, and practice stage.
- Smoke test at least one desktop screen reader/browser combination and one mobile screen reader/browser combination.
- Capture desktop and mobile screenshots once a browser is available.
- Run a browser-based automated accessibility/link check, re-run contrast tests, and record any remediation before production launch.
