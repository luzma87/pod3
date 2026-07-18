import type { SVGProps } from 'react'

import Svg001Mimbulus from './svg/others/001Mimbulus'
import Svg002Mandrake from './svg/others/002Mandrake'
import Svg003Molly from './svg/others/003Molly'
import Svg005Rita from './svg/others/005Rita'
import Svg006Gryffindor from './svg/others/006Gryffindor'
import Svg006Gryffindor2 from './svg/others/006Gryffindor2'
import Svg006Hogwarts from './svg/others/006Hogwarts'
import Svg006Hogwarts2 from './svg/others/006Hogwarts2'
import Svg006Hufflepuff from './svg/others/006Hufflepuff'
import Svg006Hufflepuff2 from './svg/others/006Hufflepuff2'
import Svg006Ravenclaw from './svg/others/006Ravenclaw'
import Svg006Ravenclaw2 from './svg/others/006Ravenclaw2'
import Svg006Slytherin from './svg/others/006Slytherin'
import Svg006Slytherin2 from './svg/others/006Slytherin2'

const otherBlocks = [
  {
    id: 'ob1',
    name: 'Mimbulus Mimbletonia',
    size: { width: 5, height: 5 },
    tags: ['mimbulus', 'mimbletonia', 'pot', 'potted', 'plant'],
    type: 'others',
    difficulty: 4,
    designer: 'Schenley Pilgram',
    file: '001-mimbulus',
    element: (props: SVGProps<SVGSVGElement>) => <Svg001Mimbulus {...props} />,
  },
  {
    id: 'ob2',
    name: 'Mandrake',
    size: { width: 5, height: 5 },
    tags: ['mandrake', 'pot', 'potted', 'plant'],
    type: 'others',
    difficulty: 2,
    designer: 'Cat Magraith',
    file: '002-mandrake',
    element: (props: SVGProps<SVGSVGElement>) => <Svg002Mandrake {...props} />,
  },
  {
    id: 'ob3',
    name: 'Molly’s Knitting',
    size: { width: 5, height: 5 },
    tags: ['molly', 'weasley', 'knitting', 'knit', 'yarn'],
    type: 'others',
    difficulty: 1,
    designer: 'Michelle Thompson',
    file: '003-molly',
    element: (props: SVGProps<SVGSVGElement>) => <Svg003Molly {...props} />,
  },
  // {
  //   id: 'ob4',
  //   name: 'Marauders map',
  //   size: { width: 10, height: 10 },
  //   tags: ['marauders', 'map', 'book', 'books'],
  //   type: 'others',
  //   difficulty: 5,
  //   designer: 'Becky Wilson (PoD FB group)',
  //   file: '004-marauders',
  //   element: (props: SVGProps<SVGSVGElement>) => <Svg004Marauders {...props} />,
  // },
  {
    id: 'ob5',
    name: 'Rita’s Scroll',
    size: { width: 10, height: 10 },
    tags: ['rita', 'scroll'],
    type: 'others',
    difficulty: 3,
    designer: 'Kristi Lehane',
    file: '005-rita',
    element: (props: SVGProps<SVGSVGElement>) => <Svg005Rita {...props} />,
  },
  {
    id: 'ob6',
    name: 'Hogwarts crest',
    size: { width: 5, height: 5 },
    tags: ['hogwarts', 'crest'],
    type: 'others',
    difficulty: 4,
    designer: 'Jennifer Ofenstein ',
    file: '006-hogwarts',
    element: (props: SVGProps<SVGSVGElement>) => <Svg006Hogwarts {...props} />,
  },
  {
    id: 'ob7',
    name: 'Hogwarts crest',
    size: { width: 6, height: 6 },
    tags: ['hogwarts', 'crest'],
    type: 'others',
    difficulty: 4,
    designer: 'Jennifer Ofenstein ',
    file: '006-hogwarts2',
    element: (props: SVGProps<SVGSVGElement>) => <Svg006Hogwarts2 {...props} />,
  },
  {
    id: 'ob8',
    name: 'Gryffindor crest',
    size: { width: 5, height: 5 },
    tags: ['gryffindor', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-gryffindor',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Gryffindor {...props} />
    ),
  },
  {
    id: 'ob9',
    name: 'Gryffindor crest',
    size: { width: 6, height: 6 },
    tags: ['gryffindor', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-gryffindor2',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Gryffindor2 {...props} />
    ),
  },
  {
    id: 'ob10',
    name: 'Hufflepuff crest',
    size: { width: 5, height: 5 },
    tags: ['hufflepuff', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-hufflepuff',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Hufflepuff {...props} />
    ),
  },
  {
    id: 'ob11',
    name: 'Hufflepuff crest',
    size: { width: 6, height: 6 },
    tags: ['hufflepuff', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-hufflepuff2',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Hufflepuff2 {...props} />
    ),
  },
  {
    id: 'ob12',
    name: 'Ravenclaw crest',
    size: { width: 5, height: 5 },
    tags: ['ravenclaw', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-ravenclaw',
    element: (props: SVGProps<SVGSVGElement>) => <Svg006Ravenclaw {...props} />,
  },
  {
    id: 'ob13',
    name: 'Ravenclaw crest',
    size: { width: 6, height: 6 },
    tags: ['ravenclaw', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-ravenclaw2',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Ravenclaw2 {...props} />
    ),
  },
  {
    id: 'ob14',
    name: 'Slytherin crest',
    size: { width: 5, height: 5 },
    tags: ['slytherin', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-slytherin',
    element: (props: SVGProps<SVGSVGElement>) => <Svg006Slytherin {...props} />,
  },
  {
    id: 'ob15',
    name: 'Slytherin crest',
    size: { width: 6, height: 6 },
    tags: ['slytherin', 'crest'],
    type: 'others',
    difficulty: 2,
    designer: 'Jennifer Ofenstein ',
    file: '006-slytherin2',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006Slytherin2 {...props} />
    ),
  },
]

export default otherBlocks
