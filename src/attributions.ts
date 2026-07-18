import ghostImage from './assets/images/not-found-ghost.png'

export interface Attribution {
  id: string
  name: string
  author: string
  href: string
  directLink: string
  source: string
  src: string
}

const attributions: Attribution[] = [
  {
    id: 'not-found-ghost',
    name: 'Ghost with hat',
    author: 'Piyaporn Teannawa',
    href: 'https://www.vecteezy.com/free-png/halloween',
    directLink: 'https://www.vecteezy.com/png/70173473-ghost-with-hat',
    source: 'Halloween PNGs by Vecteezy',
    src: ghostImage,
  },
]

export default attributions
