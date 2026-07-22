import { describe, expect, it, vi } from 'vitest'

const { setMock, getMock, refMock } = vi.hoisted(() => ({
  setMock: vi.fn().mockResolvedValue(undefined),
  getMock: vi.fn(),
  refMock: vi.fn((_database: unknown, path: string) => ({ path })),
}))

vi.mock('firebase/database', () => ({
  set: setMock,
  get: getMock,
  ref: refMock,
}))

vi.mock('./client', () => ({
  database: 'the-database',
}))

const { saveQuilt, loadQuilt } = await import('./quilts')
const { serializeQuilt } = await import('../features/workspace/serializeQuilt')

describe('saveQuilt', () => {
  it('writes the serialized quilt to /quilts/{quiltId}', async () => {
    const quilt = serializeQuilt({
      quiltId: 'brave-swift-phoenix-42',
      placedBlocks: [],
      paintedSquares: [],
      sizeKey: 'throw',
      width: 50,
      height: 65,
      user: { uid: 'user-1', isAnonymous: true },
    })

    await saveQuilt('brave-swift-phoenix-42', quilt)

    expect(refMock).toHaveBeenCalledWith(
      'the-database',
      'quilts/brave-swift-phoenix-42',
    )
    expect(setMock).toHaveBeenCalledWith(
      { path: 'quilts/brave-swift-phoenix-42' },
      quilt,
    )
  })
})

describe('loadQuilt', () => {
  it('reads /quilts/{quiltId} and returns its value when it exists', async () => {
    getMock.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ quiltName: 'brave-swift-phoenix-42' }),
    })

    const result = await loadQuilt('brave-swift-phoenix-42')

    expect(refMock).toHaveBeenCalledWith(
      'the-database',
      'quilts/brave-swift-phoenix-42',
    )
    expect(result).toEqual({ quiltName: 'brave-swift-phoenix-42' })
  })

  it('returns null when the quilt id has never been saved', async () => {
    getMock.mockResolvedValueOnce({ exists: () => false, val: () => null })

    const result = await loadQuilt('never-saved-42')

    expect(result).toBeNull()
  })
})
