import type { SVGProps } from 'react'

import Svg01ApothecaryIn from './svg/top-sides/01ApothecaryIn'
import Svg02Dobby from './svg/top-sides/02Dobby'
import Svg03HiddenSword from './svg/top-sides/03HiddenSword'
import Svg04Firebolt from './svg/top-sides/04Firebolt'
import Svg05KneazleIn from './svg/top-sides/05KneazleIn'
import Svg06Kreacher from './svg/top-sides/06Kreacher'
import Svg07DragonIn from './svg/top-sides/07DragonIn'
import Svg08GargoyleIn from './svg/top-sides/08GargoyleIn'
import Svg09Feet from './svg/top-sides/09Feet'
import Svg09Feet2 from './svg/top-sides/09Feet2'
import Svg09Feet3 from './svg/top-sides/09Feet3'
import Svg10HorntailIn from './svg/top-sides/10HorntailIn'
import Svg11Nimbus2000 from './svg/top-sides/11Nimbus2000'
import Svg12Nimbus2001 from './svg/top-sides/12Nimbus2001'
import Svg13GryffindorSword from './svg/top-sides/13GryffindorSword'
import Svg14Dobby from './svg/top-sides/14Dobby'
import Svg15Fawkes from './svg/top-sides/15Fawkes'
import Svg16Pixie from './svg/top-sides/16Pixie'
import Svg17Dobby from './svg/top-sides/17Dobby'
import Svg18Feet from './svg/top-sides/18Feet'
import Svg19Feet from './svg/top-sides/19Feet'
import Svg20Feet from './svg/top-sides/20Feet'
import Svg21Feet from './svg/top-sides/21Feet'
import Svg22OwlEars from './svg/top-sides/22OwlEars'
import Svg23Hagrid from './svg/top-sides/23Hagrid'
import Svg24ScarfGryffindor from './svg/top-sides/24ScarfGryffindor'
import Svg24ScarfHufflepuff from './svg/top-sides/24ScarfHufflepuff'
import Svg24ScarfRavenclaw from './svg/top-sides/24ScarfRavenclaw'
import Svg24ScarfSlytherin from './svg/top-sides/24ScarfSlytherin'
import Svg26Dementor from './svg/top-sides/26Dementor'

const topSidesBlocks = [
  {
    id: 'tsb1',
    name: 'Apothecary Bottles',
    size: { width: 20, height: 10 },
    tags: ['apothecary', 'bottle', 'potion'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '01-apothecary-in',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg01ApothecaryIn {...props} />
    ),
  },
  {
    id: 'tsb3',
    name: 'Dobby',
    size: { width: 6.5, height: 23 },
    tags: ['dobby', 'house', 'elf'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '02-dobby',
    element: (props: SVGProps<SVGSVGElement>) => <Svg02Dobby {...props} />,
  },
  {
    id: 'tsb4',
    name: 'Hidden Sword for the top corner of your bookcase',
    size: { width: 16.5, height: 5.5 },
    tags: ['hidden', 'sword'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Sheila Fordyce',
    file: '03-hidden_sword',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg03HiddenSword {...props} />
    ),
  },
  {
    id: 'tsb5',
    name: 'Firebolt',
    size: { width: 10, height: 30 },
    tags: ['firebolt', 'broom', 'broomstick'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '04-firebolt',
    element: (props: SVGProps<SVGSVGElement>) => <Svg04Firebolt {...props} />,
  },
  {
    id: 'tsb6',
    name: 'Kneazle',
    size: { width: 20, height: 10 },
    tags: ['kneazle'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '05-kneazle-in',
    element: (props: SVGProps<SVGSVGElement>) => <Svg05KneazleIn {...props} />,
  },
  {
    id: 'tsb8',
    name: 'Kreacher',
    size: { width: 10, height: 20 },
    tags: ['kreacher', 'house', 'elf'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '06-kreacher',
    element: (props: SVGProps<SVGSVGElement>) => <Svg06Kreacher {...props} />,
  },
  {
    id: 'tsb10',
    name: 'Sleeping Dragon',
    size: { width: 20, height: 8 },
    tags: ['sleeping', 'dragon'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '07-dragon-in',
    element: (props: SVGProps<SVGSVGElement>) => <Svg07DragonIn {...props} />,
  },
  {
    id: 'tsb12',
    name: 'Perched Gargoyle',
    size: { width: 10, height: 10 },
    tags: ['gargoyle', 'perched'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '08-gargoyle-in',
    element: (props: SVGProps<SVGSVGElement>) => <Svg08GargoyleIn {...props} />,
  },
  {
    id: 'tsb14',
    name: 'Bookcase Feet',
    size: { width: 10, height: 10 },
    tags: ['bookcase', 'feet', 'books', 'book'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Tereza Kulovaná',
    file: '09-feet',
    element: (props: SVGProps<SVGSVGElement>) => <Svg09Feet {...props} />,
  },
  {
    id: 'tsb15',
    name: 'Bookcase Feet',
    size: { width: 10, height: 10 },
    tags: ['bookcase', 'feet', 'books', 'book'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Tereza Kulovaná',
    file: '09-feet2',
    element: (props: SVGProps<SVGSVGElement>) => <Svg09Feet2 {...props} />,
  },
  {
    id: 'tsb16',
    name: 'Bookcase Feet',
    size: { width: 10, height: 6 },
    tags: ['bookcase', 'feet', 'books', 'book'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Tereza Kulovaná',
    file: '09-feet3',
    element: (props: SVGProps<SVGSVGElement>) => <Svg09Feet3 {...props} />,
  },
  {
    id: 'tsb17',
    name: 'Hungarian Horntail',
    size: { width: 20, height: 10 },
    tags: ['book', 'books', 'hungarian', 'horntail', 'dragon'],
    type: 'top-sides',
    difficulty: 5,
    designer: 'Jen Rose',
    file: '10-horntail-in',
    element: (props: SVGProps<SVGSVGElement>) => <Svg10HorntailIn {...props} />,
  },
  {
    id: 'tsb19',
    name: 'Nimbus 2000',
    size: { width: 11.5, height: 30 },
    tags: ['nimbus', 'broom', 'broomstick'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '11-nimbus_2000',
    element: (props: SVGProps<SVGSVGElement>) => <Svg11Nimbus2000 {...props} />,
  },
  {
    id: 'tsb20',
    name: 'Nimbus 2001',
    size: { width: 11.5, height: 30 },
    tags: ['nimbus', 'broom', 'broomstick'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '12-nimbus_2001',
    element: (props: SVGProps<SVGSVGElement>) => <Svg12Nimbus2001 {...props} />,
  },
  {
    id: 'tsb21',
    name: 'Sword of Gryffindor',
    size: { width: 58, height: 12 },
    tags: ['sword', 'gryffindor'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '13-gryffindor_sword',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg13GryffindorSword {...props} />
    ),
  },
  {
    id: 'tsb22',
    name: 'Bookcase Dobby',
    size: { width: 20, height: 40 },
    tags: ['dobby', 'house', 'elf'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Michelle Thompson',
    file: '14-dobby',
    element: (props: SVGProps<SVGSVGElement>) => <Svg14Dobby {...props} />,
  },
  {
    id: 'tsb23',
    name: 'Fawkes on a Perch',
    size: { width: 10, height: 36 },
    tags: ['fawkes', 'perch'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'AJ',
    file: '15-fawkes',
    element: (props: SVGProps<SVGSVGElement>) => <Svg15Fawkes {...props} />,
  },
  {
    id: 'tsb24',
    name: 'Caged Cornish Pixie',
    size: { width: 12, height: 16 },
    tags: ['caged', 'cornish', 'pixie'],
    type: 'top-sides',
    difficulty: 4,
    designer: 'Esther Wheat',
    file: '16-pixie',
    element: (props: SVGProps<SVGSVGElement>) => <Svg16Pixie {...props} />,
  },
  {
    id: 'tsb25',
    name: 'Dobby the House Elf',
    size: { width: 20, height: 35 },
    tags: ['dobby', 'house', 'elf'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Esther Wheat',
    file: '17-dobby',
    element: (props: SVGProps<SVGSVGElement>) => <Svg17Dobby {...props} />,
  },
  {
    id: 'tsb26',
    name: 'Bookcase Feet - Paws',
    size: { width: 6, height: 6 },
    tags: ['bookcase', 'feet', 'paws'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Daphne Seymour',
    file: '18-feet',
    element: (props: SVGProps<SVGSVGElement>) => <Svg18Feet {...props} />,
  },
  {
    id: 'tsb27',
    name: 'Bookcase Feet - Witch Feet',
    size: { width: 8, height: 8 },
    tags: ['bookcase', 'feet', 'witch'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Daphne Seymour',
    file: '19-feet',
    element: (props: SVGProps<SVGSVGElement>) => <Svg19Feet {...props} />,
  },
  {
    id: 'tsb28',
    name: 'Left Foot & Right Foot',
    size: { width: 7.5, height: 6 },
    tags: ['bookcase', 'feet'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Gretchen Kohlhaas',
    file: '20-feet',
    element: (props: SVGProps<SVGSVGElement>) => <Svg20Feet {...props} />,
  },
  {
    id: 'tsb29',
    name: 'Rounded Bookcase Feet',
    size: { width: 4, height: 6 },
    tags: ['bookcase', 'feet', 'rounded'],
    type: 'top-sides',
    difficulty: 2,
    designer: 'Gretchen Kohlhaas',
    file: '21-feet',
    element: (props: SVGProps<SVGSVGElement>) => <Svg21Feet {...props} />,
  },
  {
    id: 'tsb30',
    name: 'Bookcase Owl Ears Topper',
    size: { width: 20, height: 10 },
    tags: ['bookcase', 'owl', 'ears', 'top'],
    type: 'top-sides',
    difficulty: 1,
    designer: 'Jennifer Ofenstein',
    file: '22-owl_ears',
    element: (props: SVGProps<SVGSVGElement>) => <Svg22OwlEars {...props} />,
  },
  {
    id: 'tsb31',
    name: 'Hagrid’s Flowery Pink Umbrella',
    size: { width: 10, height: 25 },
    tags: ['hagrid', 'umbrella'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Jennifer Ofenstein',
    file: '23-hagrid',
    element: (props: SVGProps<SVGSVGElement>) => <Svg23Hagrid {...props} />,
  },
  {
    id: 'tsb32',
    name: 'Gryffindor Scarf Pattern',
    size: { width: 10, height: 20 },
    tags: ['scarf', 'gryffindor'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '24-scarf-gryffindor',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg24ScarfGryffindor {...props} />
    ),
  },
  {
    id: 'tsb33',
    name: 'Hufflepuff Scarf Pattern',
    size: { width: 10, height: 20 },
    tags: ['scarf', 'hufflepuff'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '24-scarf-hufflepuff',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg24ScarfHufflepuff {...props} />
    ),
  },
  {
    id: 'tsb34',
    name: 'Ravenclaw Scarf Pattern',
    size: { width: 10, height: 20 },
    tags: ['scarf', 'ravenclaw'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '24-scarf-ravenclaw',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg24ScarfRavenclaw {...props} />
    ),
  },
  {
    id: 'tsb35',
    name: 'Slytherin Scarf Pattern',
    size: { width: 10, height: 20 },
    tags: ['scarf', 'slytherin'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '24-scarf-slytherin',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg24ScarfSlytherin {...props} />
    ),
  },
  {
    id: 'tsb36',
    name: 'Dementor',
    size: { width: 12, height: 24 },
    tags: ['dementor'],
    type: 'top-sides',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '26-dementor',
    element: (props: SVGProps<SVGSVGElement>) => <Svg26Dementor {...props} />,
  },
]

export default topSidesBlocks
