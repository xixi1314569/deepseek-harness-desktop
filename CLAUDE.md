# 项目二次开发工作流（所有 agent 必须遵守）

本项目是 [ningbainb/deepseek-harness-desktop](https://github.com/ningbainb/deepseek-harness-desktop) 的二次开发副本。
原始仓库 `xixi1314569/deepseek-harness-desktop`（origin）是 ningbainb 主干的镜像。

## Remote 布局

| Remote | URL | 用途 |
|---|---|---|
| `upstream` | `https://github.com/ningbainb/deepseek-harness-desktop.git` | **只读**。fetch 上游主干；push 已被设为 `DISABLE`，任何推送尝试都会报错，不要绕过 |
| `origin` | `https://github.com/xixi1314569/deepseek-harness-desktop.git` | 我们自己的 GitHub 仓库，用于推送备份 main/develop |

仓库级 git 配置已写入 `http.proxy` / `https.proxy = http://127.0.0.1:6850`（本机直连 GitHub 超时，必须走代理）。

## 分支规则

- `main`：**上游主干的纯净镜像，严禁直接 commit**。
  唯一允许的操作是快进同步：
  ```bash
  git fetch upstream
  git checkout main
  git merge --ff-only upstream/main
  ```
  如果 `--ff-only` 失败，说明本地 main 被污染过——停下来排查，不要改成普通 merge。
- `develop`：**所有二次开发的唯一主线**。从 `main` 切出，我们的功能最终都合到这里。
- `feature/xxx`：从 `develop` 切出，完成后合回 `develop`。

## 同步流程（数据流向：上游 → 本地 main → develop）

```bash
# 1. 同步上游到本地 main（ff-only，见上）

# 2. 把上游进展带入开发线
git checkout develop
git rebase main        # 个人分支首选 rebase，保持提交历史干净

# 3. 备份到自己的 GitHub
git push origin main
git push -f origin develop   # rebase 后需要 force；develop 是我们独占的分支，force 安全
```

注意：`develop` rebase 之后历史改写，推 origin 需要 `-f`；但 **`main` 永远不许 force push**。

## 改动收敛原则

二次开发的改动尽量放在新文件/独立模块中，少大改上游原有文件——rebase 时冲突面最小。
只跟上游 `main` 分支，忽略上游的 `codex/*` 版本分支。

## 禁止事项

- ❌ 在 `main` 上直接 commit / merge 非快进提交
- ❌ 向 `upstream` 推送（已被 DISABLE 拦截）
- ❌ force push `main`
- ❌ 移除仓库级代理配置

## Fork 本地修改清单（rebase 时这些差异是故意的，不要回退）

1. `apps/dsh-desktop/src/electron-app.mjs`（DesktopUpdateController 构造处）：
   `enabled: false` —— 禁用自动更新。上游更新 feed 指向 ningbainb 仓库，
   启用会导致打包版"更新"时被上游原版覆盖。恢复方法见该处注释。
2. 遥测保持仓库默认关闭状态（`apps/dsh-desktop/build/telemetry-config.json`
   为 `{"endpoint":"","officialBuild":false}`），不要模仿上游 release workflow
   注入 `DSH_TELEMETRY_ENDPOINT`。
3. `apps/dsh-desktop/src/profile.mjs`：
   - `BUILTIN_RUNTIME_PACKAGES`（约 165 行）：含 `@xixi1314569/dsh-project-context`
     等二开插件的登记行（标注 `[fork]` 注释）。**每新增一个 `@xixi1314569/dsh-*`
     插件包都必须在此登记一行**——这是桌面 profile 依赖枚举的源头，漏了会导致
     runtime 解析不到插件包。
   - `AGGREGATED_BUNDLES`（约 66 行）：同名包也加了一行（迁移/去重用）。
   - 同步要求：`packages/dsh-web-ui-all/aggregate.yml`（patchFrom + deps）
     与 `scripts/feature-baseline.json` 各加条目，否则 feature-baseline 门禁失败。

