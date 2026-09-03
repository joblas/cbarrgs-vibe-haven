# cbarrgs — agent entry point

**Read `CLAUDE.md` first — it is this repo's constitution and source of truth.**
This repo follows the canonical build-and-ship pipeline in
`joestechsolutions/agent-playbook/AGENTS.md` — isolate → structure → prove → ship,
with the ship step gated by an independent review-to-green pass (the `ship-loop`
skill, enforced by the `pr-review-watcher` cron). `CLAUDE.md` wins on any conflict.
Merge is always Joe's.
