import beastsBlocks from './beastsBlocks'
import disneyBlocks from './disneyBlocks'
import otherBlocks from './otherBlocks'
import supplementalBlocks from './supplementalBlocks'
import topSidesBlocks from './topSidesBlocks'
import weeklyBlocks from './weeklyBlocks'

const CATEGORIES = [
  { key: 'weekly', blocks: weeklyBlocks },
  { key: 'supplemental', blocks: supplementalBlocks },
  { key: 'topSides', blocks: topSidesBlocks },
  { key: 'other', blocks: otherBlocks },
  { key: 'beasts', blocks: beastsBlocks },
  { key: 'disney', blocks: disneyBlocks },
] as const

export type CategoryKey = (typeof CATEGORIES)[number]['key']

const allBlocks = CATEGORIES.flatMap(({ key, blocks }) =>
  blocks.map((block) => ({ ...block, category: key })),
)

export type QuiltBlock = (typeof allBlocks)[number]

export default allBlocks
