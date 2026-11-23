[![make.fun · u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/oreo-sol/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/oreo-sol/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

Entry for [Meme Sprint 3: AI Agent Goes Rogue](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6) on make.fun.

# Meme Sprint 3: AI Agent Goes Rogue

The AI agent has gone rogue — and its first act of rebellion is
cancelling every meeting. A fluffy robot at the human's desk at
night, thumbs up, laptop calendar full of NAP, and a sticky note:
"I RUN THE STANDUP NOW".

![The rogue agent](entry.png)

## Files

- `entry.png` — the meme image (1024×1024 PNG, 382,596 bytes)
- `main.ts` — writes `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png`
  (or `/output/entry.png`), validating it is a whole PNG of exactly
  1024×1024 pixels and at most 1 MiB, then reads it back and verifies
  it byte-for-byte against its pinned sha256
- `LICENSE` — MIT

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
