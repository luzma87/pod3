import { describe, expect, it, vi } from 'vitest'

const { setMock, refMock } = vi.hoisted(() => ({
  setMock: vi.fn().mockResolvedValue(undefined),
  refMock: vi.fn((_database: unknown, path: string) => ({ path })),
}))

vi.mock('firebase/database', () => ({
  set: setMock,
  ref: refMock,
}))

vi.mock('./client', () => ({
  database: 'the-database',
}))

const { saveQuilt } = await import('./quilts')
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
