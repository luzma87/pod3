export interface QuiltSize {
  labelKey: string
  width: number
  height: number
}

export const QUILT_SIZES = {
  baby: { labelKey: 'baby', width: 30, height: 40 },
  babyHorizontal: { labelKey: 'babyHorizontal', width: 40, height: 30 },
  lap: { labelKey: 'lap', width: 36, height: 52 },
  lapHorizontal: { labelKey: 'lapHorizontal', width: 52, height: 36 },
  throw: { labelKey: 'throw', width: 50, height: 65 },
  throwHorizontal: { labelKey: 'throwHorizontal', width: 65, height: 50 },
  twin: { labelKey: 'twin', width: 70, height: 90 },
  twinHorizontal: { labelKey: 'twinHorizontal', width: 90, height: 70 },
  doubleFull: { labelKey: 'doubleFull', width: 85, height: 108 },
  doubleFullHorizontal: {
    labelKey: 'doubleFullHorizontal',
    width: 108,
    height: 85,
  },
  queen: { labelKey: 'queen', width: 90, height: 108 },
  queenHorizontal: { labelKey: 'queenHorizontal', width: 108, height: 90 },
  king: { labelKey: 'king', width: 110, height: 108 },
  kingHorizontal: { labelKey: 'kingHorizontal', width: 108, height: 110 },
} as const satisfies Record<string, QuiltSize>

export type QuiltSizeKey = keyof typeof QUILT_SIZES
