import { describe, expect, it } from 'vitest'
import { apply, inject } from '../src/index.ts'

describe('project-context host half (Phase 0 scaffold)', () => {
  it('declares the systemPrompt inject', () => {
    expect(inject).toEqual(['systemPrompt'])
  })

  it('registers one system prompt section', () => {
    const sections: Array<Record<string, unknown>> = []
    const ctx = {
      effect: (fn: () => () => void) => fn(),
      systemPrompt: {
        section: (spec: Record<string, unknown>) => {
          sections.push(spec)
          return () => {}
        },
      },
    }
    apply(ctx as never)
    expect(sections).toHaveLength(1)
    expect(sections[0]).toMatchObject({ name: 'plugin:project-context', order: 210 })
    expect(typeof sections[0].text).toBe('function')
  })
})
