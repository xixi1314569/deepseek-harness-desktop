/**
 * Browser-half entry for the dsh-project-context plugin — runs inside the dsh web GUI.
 *
 * The GUI loads this half from the bundle at /plugins/project-context/client.js
 * through window.__ModuleLoader__; the plugin context exposes the client
 * runtime services (sessions, workspaces, ui slots, ...). For a full example
 * of DOM injection, runtime wiring and React views, see task-board's
 * src/client/index.ts or the skins under packages/skins/.
 *
 * Phase 0 scaffold: no browser behavior yet. EPIC-01 will add the settings
 * card and the Context visualization panel (V1.2 requirement doc, PC-F07).
 */
import type { Context } from '@deepseek-ai/cordis'

/** Apply the browser half. */
export function apply(_ctx: Context): void {
  // A bare skeleton does nothing.
}
