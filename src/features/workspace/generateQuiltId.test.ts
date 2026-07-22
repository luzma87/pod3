import { describe, expect, it } from 'vitest'
import { generateQuiltId } from './generateQuiltId'

describe('generateQuiltId', () => {
  it('produces an adjective-adjective-noun-NN slug', () => {
    const id = generateQuiltId()
    expect(id).toMatch(/^[a-z]+-[a-z]+-[a-z]+-\d{2}$/)
  })

  it('never repeats the same adjective twice in a row', () => {
    for (let i = 0; i < 200; i++) {
      const [first, second] = generateQuiltId().split('-')
      expect(first).not.toBe(second)
    }
  })

  it('produces varied ids across many calls', () => {
    const ids = new Set(Array.from({ length: 200 }, () => generateQuiltId()))
    expect(ids.size).toBeGreaterThan(190)
  })
})
