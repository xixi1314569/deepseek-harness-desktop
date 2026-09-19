# @xixi1314569/dsh-project-context

English | [中文](README.zh.md)

DSH plugin `project-context` — Phase 0 scaffold of the Project Context module
(auto-loaded project context for the personal AI workbench; see the V1.2
requirement document for the full design).

## What it does

Host half announces the plugin to every agent through a SystemPrompt section,
verifying the full load chain (profile patch row, host half, system prompt
assembly) end to end. Project detection, `.dsh/project.yaml` loading, context
budgeting and injection arrive with EPIC-01. The browser half is a skeleton
for now.

## Install

### From the repository (development)

```sh
git clone https://github.com/xixi1314569/deepseek-harness-desktop.git
cd deepseek-harness-desktop
pnpm install
pnpm -r build
dsh plugin --profile web add link:$(pwd)/packages/dsh-project-context
```

Or rely on the aggregate bundle: the package is registered in
`packages/dsh-web-ui-all/aggregate.yml`, so `node scripts/aggregate.mjs`
pulls its patch row into the aggregate.

## Known limitations

- Scaffold milestone: no project detection, no context injection yet.
- No settings card in the Web UI yet.

## License

BSD-3-Clause.
