// HP-flavored word pairs for shareable quilt ids, e.g. "brave-swift-phoenix-42".
// Nothing here needs to be exhaustive — just enough variety that ids feel
// distinct and fun rather than colliding constantly.
const ADJECTIVES = [
  'brave',
  'swift',
  'clever',
  'loyal',
  'mystic',
  'silent',
  'golden',
  'shadow',
  'wise',
  'daring',
  'nimble',
  'ancient',
  'curious',
  'valiant',
  'sly',
  'bold',
  'gentle',
  'fierce',
  'radiant',
  'stealthy',
  'lucky',
  'noble',
  'wild',
  'merry',
  'crimson',
  'silver',
  'emerald',
  'scarlet',
  'midnight',
  'starlit',
  'frosty',
  'stormy',
  'cunning',
  'gallant',
  'serene',
  'vivid',
  'whispering',
  'glimmering',
  'thunderous',
  'moonlit',
  'sunlit',
  'shimmering',
  'restless',
  'fearless',
  'quiet',
  'roaring',
  'hidden',
]

const NOUNS = [
  'phoenix',
  'wand',
  'owl',
  'broom',
  'cauldron',
  'quill',
  'potion',
  'dragon',
  'unicorn',
  'raven',
  'griffin',
  'comet',
  'lantern',
  'mirror',
  'cloak',
  'compass',
  'ember',
  'willow',
  'hollow',
  'nimbus',
  'patronus',
  'goblet',
  'wizard',
  'sorcerer',
  'witch',
  'sorceress',
  'enchantress',
  'priestess',
  'empress',
  'duchess',
  'siren',
  'nymph',
  'muse',
  'valkyrie',
  'seer',
  'huntress',
  'sphinx',
  'pixie',
  'fairy',
  'sibyl',
  'banshee',
  'maiden',
]

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function pickTwoDistinct<T>(list: T[]): [T, T] {
  const first = pick(list)
  let second = pick(list)
  while (second === first) {
    second = pick(list)
  }
  return [first, second]
}

function randomTwoDigitSuffix(): string {
  return String(Math.floor(Math.random() * 100)).padStart(2, '0')
}

export function generateQuiltId(): string {
  const [firstAdjective, secondAdjective] = pickTwoDistinct(ADJECTIVES)
  const noun = pick(NOUNS)
  return `${firstAdjective}-${secondAdjective}-${noun}-${randomTwoDigitSuffix()}`
}
