# @xixi1314569/dsh-project-context

[English](README.md) | 中文

DSH 插件 `project-context` —— Project Context 模块（个人 AI 工作台的项目上下文
自动装载）的 Phase 0 骨架。完整设计见 V1.2 需求文档。

## 是什么

Host 半区通过 SystemPrompt section 向每个 agent 宣告插件存在，用于端到端验证
完整装载链（profile patch 行 → host 半区 → system prompt 组装）。项目识别、
`.dsh/project.yaml` 装载、上下文预算与注入在 EPIC-01 实现。浏览器半区目前是
空骨架。

## 安装

### 从仓库安装（开发调试）

```sh
git clone https://github.com/xixi1314569/deepseek-harness-desktop.git
cd deepseek-harness-desktop
pnpm install
pnpm -r build
dsh plugin --profile web add link:$(pwd)/packages/dsh-project-context
```

也可以依赖聚合包：本包已注册进 `packages/dsh-web-ui-all/aggregate.yml`，
`node scripts/aggregate.mjs` 会把它的 patch 行汇总进聚合包。

## 已知限制

- 骨架里程碑：尚无项目识别与上下文注入。
- Web UI 尚无设置卡。

## 许可证

BSD-3-Clause。
