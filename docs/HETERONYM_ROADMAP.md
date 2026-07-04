# Heteronym Pronunciation Roadmap

## Current decision

Heteronyms remain spelling-only entries in the sentence bank. They should keep
`sentenceOmissionReason: 'heteronym'` and should not receive example sentences
until the product can reliably connect a spelling, a pronunciation, and a word
sense.

This preserves the current behavior: the app can still speak the isolated word
for spelling practice, while the "Use in a Sentence" affordance stays hidden so
students do not hear a sentence that implies a different pronunciation than the
word prompt.

## Why this remains future work

Browser text-to-speech cannot reliably infer which pronunciation a heteronym
should use from an isolated spelling prompt. Words such as `read`, `lead`,
`wind`, `tear`, `row`, `sow`, `close`, `minute`, `present`, `object`,
`produce`, `record`, `desert`, `refuse`, and `live` can change pronunciation
with meaning or part of speech.

## Future architecture requirements

A pronunciation-aware implementation should support:

- multiple pronunciations for the same spelling;
- pronunciation or sense IDs, such as `record-noun` and `record-verb`;
- child-friendly sense labels, such as "present meaning a gift";
- part-of-speech metadata;
- optional IPA or pronunciation metadata for editorial review;
- per-sense example sentences;
- TTS override hooks for a future speech engine or SSML-capable provider;
- human audio QA before enabling sentence playback for heteronyms.

## Non-goals for the current curriculum freeze

Do not add example sentences to current heteronym entries. Do not use fake
respellings, IPA in learner-facing copy, or sentence wording tricks to force a
browser TTS pronunciation. This roadmap item is product architecture work, not a
remaining curriculum gap.
