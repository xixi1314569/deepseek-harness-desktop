/**
 * Host loader entry for the dsh-project-context plugin — runs in the DSH host process.
 *
 * Phase 0 scaffold: announces the plugin to every agent through a SystemPrompt
 * section (task-board / memory precedent) so the full load chain — profile
 * patch row, host half, system prompt assembly — is verifiable end to end.
 * Real project detection and context injection arrive with EPIC-01
 * (see the V1.2 requirement doc, chapter 2).
 */
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-system-prompt'

export const inject = ['systemPrompt']

/** Apply the host half. */
export function apply(ctx: Context): void {
  ctx.effect(() => {
    const dispose = ctx.systemPrompt.section({
      name: 'plugin:project-context',
      order: 210,
      text: () =>
        'The project-context plugin is installed (scaffold milestone). '
        + 'Automatic project metadata loading is not enabled yet.',
    })
    return () => { dispose() }
  }, 'project-context: system prompt announcement')
}
