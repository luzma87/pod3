import catClosingEyesImage from './assets/images/cat-closing-eyes.png'
import catInCauldronImage from './assets/images/cat-in-cauldron.png'
import catInPumpkinImage from './assets/images/cat-in-pumpkin.png'
import catWithBroomImage from './assets/images/cat-with-broom.png'
import catWithHatImage from './assets/images/cat-with-hat.png'
import ghostInPumpkinImage from './assets/images/ghost-in-pumpkin.png'
import ghostSmilingImage from './assets/images/ghost-smiling.png'
import ghostWithCandyImage from './assets/images/ghost-with-candy.png'
import ghostWithPumpkinsImage from './assets/images/ghost-with-pumpkins.png'
import ghostWithHatImage from './assets/images/not-found-ghost.png'

export interface Attribution {
  id: string
  name: string
  author: string
  href: string
  directLink: string
  source: string
  src: string
}

// All from the same Vecteezy "Halloween PNGs" collection by the same
// designer — the shared fields below are deliberately not deduplicated
// into a helper, so each entry stays a plain, independently-readable
// object like the rest of the array.
const AUTHOR = 'Piyaporn Teannawa'
const COLLECTION_HREF = 'https://www.vecteezy.com/free-png/halloween'
const SOURCE = 'Halloween PNGs by Vecteezy'

const attributions: Attribution[] = [
  {
    id: 'ghost-with-hat',
    name: 'Ghost with hat',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173473-ghost-with-hat',
    source: SOURCE,
    src: ghostWithHatImage,
  },
  {
    id: 'ghost-in-pumpkin',
    name: 'Ghost in a pumpkin',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173459-ghost-in-the-pumkin',
    source: SOURCE,
    src: ghostInPumpkinImage,
  },
  {
    id: 'ghost-smiling',
    name: 'Smiling ghost',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173460-ghost-smile-so-cute',
    source: SOURCE,
    src: ghostSmilingImage,
  },
  {
    id: 'ghost-with-pumpkins',
    name: 'Ghost with pumpkins',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173466-ghost-with-pumkins',
    source: SOURCE,
    src: ghostWithPumpkinsImage,
  },
  {
    id: 'ghost-with-candy',
    name: 'Ghost with candy',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173469-ghost-with-candy',
    source: SOURCE,
    src: ghostWithCandyImage,
  },
  {
    id: 'cat-with-broom',
    name: 'Cat with broom',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173461-black-cat-with-broom',
    source: SOURCE,
    src: catWithBroomImage,
  },
  {
    id: 'cat-with-hat',
    name: 'Cat with hat',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173462-black-cat-so-cute',
    source: SOURCE,
    src: catWithHatImage,
  },
  {
    id: 'cat-in-pumpkin',
    name: 'Cat in a pumpkin',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173482-black-cat-in-pumkin',
    source: SOURCE,
    src: catInPumpkinImage,
  },
  {
    id: 'cat-in-cauldron',
    name: 'Cat in a cauldron',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173470-black-cat-in-the-pot',
    source: SOURCE,
    src: catInCauldronImage,
  },
  {
    id: 'cat-closing-eyes',
    name: 'Cat closing its eyes',
    author: AUTHOR,
    href: COLLECTION_HREF,
    directLink: 'https://www.vecteezy.com/png/70173474-black-cat-closes-eyes',
    source: SOURCE,
    src: catClosingEyesImage,
  },
]

export default attributions
