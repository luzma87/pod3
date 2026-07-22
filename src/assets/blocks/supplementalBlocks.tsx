import type { SVGProps } from 'react'

import Svg001Colin from './svg/supplemental/001Colin'
import Svg002Dre from './svg/supplemental/002Dre'
import Svg003EarMuffs from './svg/supplemental/003EarMuffs'
import Svg004Grim from './svg/supplemental/004Grim'
import Svg005Voldemort from './svg/supplemental/005Voldemort'
import Svg006HoneydukesBooks from './svg/supplemental/006HoneydukesBooks'
import Svg007HoneydukesBoxes from './svg/supplemental/007HoneydukesBoxes'
import Svg008Honeydukes from './svg/supplemental/008Honeydukes'
import Svg009ScarfGryffindor from './svg/supplemental/009ScarfGryffindor'
import Svg009ScarfHufflepuff from './svg/supplemental/009ScarfHufflepuff'
import Svg009ScarfRavenclaw from './svg/supplemental/009ScarfRavenclaw'
import Svg009ScarfSlytherin from './svg/supplemental/009ScarfSlytherin'
import Svg010Lantern from './svg/supplemental/010Lantern'
import Svg011Lovegood from './svg/supplemental/011Lovegood'
import Svg012LunaHat from './svg/supplemental/012LunaHat'
import Svg012LunaHat2 from './svg/supplemental/012LunaHat2'
import Svg013LunaSpectrespecs from './svg/supplemental/013LunaSpectrespecs'
import Svg014Mafalda from './svg/supplemental/014Mafalda'
import Svg015Omnioculars from './svg/supplemental/015Omnioculars'
import Svg016Pygmy from './svg/supplemental/016Pygmy'
import Svg017Quidditch from './svg/supplemental/017Quidditch'
import Svg018Rememberall from './svg/supplemental/018Rememberall'
import Svg019Ripped from './svg/supplemental/019Ripped'
import Svg020Rita from './svg/supplemental/020Rita'
import Svg021Hat from './svg/supplemental/021Hat'
import Svg022Skelegro from './svg/supplemental/022Skelegro'
import Svg023BishopDark from './svg/supplemental/023BishopDark'
import Svg023BishopLight from './svg/supplemental/023BishopLight'
import Svg024KingQueenDark from './svg/supplemental/024KingQueenDark'
import Svg024KingQueenLight from './svg/supplemental/024KingQueenLight'
import Svg025KnightDark from './svg/supplemental/025KnightDark'
import Svg025KnightLight from './svg/supplemental/025KnightLight'
import Svg026Mortar from './svg/supplemental/026Mortar'
import Svg027Deluminator from './svg/supplemental/027Deluminator'
import Svg028Mermaid from './svg/supplemental/028Mermaid'
import Svg030Diadem from './svg/supplemental/030Diadem'
import Svg031Fleur from './svg/supplemental/031Fleur'
import Svg032Ron from './svg/supplemental/032Ron'
import Svg033MonsterBook from './svg/supplemental/033MonsterBook'
import Svg034Advanced from './svg/supplemental/034Advanced'
import Svg035Umbridge from './svg/supplemental/035Umbridge'
import Svg036Ferret from './svg/supplemental/036Ferret'
import Svg037Bella from './svg/supplemental/037Bella'
import Svg038Raven from './svg/supplemental/038Raven'
import Svg039HousePoints from './svg/supplemental/039HousePoints'
import Svg040Lucius from './svg/supplemental/040Lucius'
import Svg041Salazar from './svg/supplemental/041Salazar'
import Svg042Remus from './svg/supplemental/042Remus'
import Svg043Bella from './svg/supplemental/043Bella'
import Svg044Occlumency from './svg/supplemental/044Occlumency'
import Svg045DarkArts from './svg/supplemental/045DarkArts'
import Svg046Memos from './svg/supplemental/046Memos'
import Svg047Scabbers from './svg/supplemental/047Scabbers'
import Svg048SnapeWand from './svg/supplemental/048SnapeWand'
import Svg049LilysGoldfishBowl from './svg/supplemental/049LilysGoldfishBowl'
import Svg050Pixie from './svg/supplemental/050Pixie'
import Svg051SpiderwebCorner from './svg/supplemental/051SpiderwebCorner'
import Svg052WingardiumLeviosa from './svg/supplemental/052WingardiumLeviosa'
import Svg053ScreamingMandrake from './svg/supplemental/053ScreamingMandrake'
import Svg054MistletoeWithBooks from './svg/supplemental/054MistletoeWithBooks'
import Svg055Mistletoe from './svg/supplemental/055Mistletoe'
import Svg056GoldBars from './svg/supplemental/056GoldBars'
import Svg057GoldCoins1 from './svg/supplemental/057GoldCoins1'
import Svg058GoldCoins2 from './svg/supplemental/058GoldCoins2'
import Svg059GoldenEgg from './svg/supplemental/059GoldenEgg'
import Svg060NifflerWithRing from './svg/supplemental/060NifflerWithRing'
import Svg061StagDoeBookends from './svg/supplemental/061StagDoeBookends'
import Svg062RitaSkeeterInAJar from './svg/supplemental/062RitaSkeeterInAJar'
import Svg063TonTongueToffee from './svg/supplemental/063TonTongueToffee'

const supplementalBlocks = [
  {
    id: 'sb1',
    name: 'Colin’s Camera',
    size: { width: 10, height: 10 },
    tags: ['colin', 'camera', 'book', 'books'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '001-colin',
    element: (props: SVGProps<SVGSVGElement>) => <Svg001Colin {...props} />,
  },
  {
    id: 'sb2',
    name: 'Dre Shrunken Head',
    size: { width: 10, height: 10 },
    tags: ['dre', 'shrunken', 'head'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '002-dre',
    element: (props: SVGProps<SVGSVGElement>) => <Svg002Dre {...props} />,
  },
  {
    id: 'sb3',
    name: 'Ear Muffs',
    size: { width: 10, height: 10 },
    tags: ['ear', 'muffs'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Michelle Thompson',
    file: '003-ear-muffs',
    element: (props: SVGProps<SVGSVGElement>) => <Svg003EarMuffs {...props} />,
  },
  {
    id: 'sb4',
    name: 'Grim Block',
    size: { width: 10, height: 10 },
    tags: ['ear', 'muffs'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Tianna Homer',
    file: '004-grim',
    element: (props: SVGProps<SVGSVGElement>) => <Svg004Grim {...props} />,
  },
  {
    id: 'sb5',
    name: 'He Who Must Not Be Named @ King’s Cross',
    size: { width: 10, height: 10 },
    tags: ['voldemort', 'books', 'book', 'king', 'cross'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Vanda Chittenden',
    file: '005-voldemort',
    element: (props: SVGProps<SVGSVGElement>) => <Svg005Voldemort {...props} />,
  },
  {
    id: 'sb6',
    name: 'Honeydukes Jar & Books',
    size: { width: 10, height: 10 },
    tags: ['honeydukes', 'books', 'book', 'jar'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '006-honeydukes-books',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg006HoneydukesBooks {...props} />
    ),
  },
  {
    id: 'sb7',
    name: 'Honeydukes Jar & Boxes',
    size: { width: 10, height: 10 },
    tags: ['honeydukes', 'box', 'boxes', 'jar'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '007-honeydukes-boxes',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg007HoneydukesBoxes {...props} />
    ),
  },
  {
    id: 'sb8',
    name: 'Honeydukes Sherbet Lemons',
    size: { width: 10, height: 10 },
    tags: ['honeydukes', 'jar', 'sherbet', 'lemon'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Wendi Riggens-Miller',
    file: '008-honeydukes',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg008Honeydukes {...props} />
    ),
  },
  {
    id: 'sb9',
    name: 'House Scarf - Gryffindor',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'gryffindor', 'scarf'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '009-scarf-gryffindor',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg009ScarfGryffindor {...props} />
    ),
  },
  {
    id: 'sb10',
    name: 'House Scarf - Hufflepuff',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'hufflepuff', 'scarf'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '009-scarf-hufflepuff',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg009ScarfHufflepuff {...props} />
    ),
  },
  {
    id: 'sb11',
    name: 'House Scarf - Ravenclaw',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'ravenclaw', 'scarf'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '009-scarf-ravenclaw',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg009ScarfRavenclaw {...props} />
    ),
  },
  {
    id: 'sb12',
    name: 'House Scarf - Slytherin',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'slytherin', 'scarf'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '009-scarf-slytherin',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg009ScarfSlytherin {...props} />
    ),
  },
  {
    id: 'sb13',
    name: 'Lantern',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'lantern'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Wendi Riggens-Miller',
    file: '010-lantern',
    element: (props: SVGProps<SVGSVGElement>) => <Svg010Lantern {...props} />,
  },
  {
    id: 'sb14',
    name: 'Lovegood ',
    size: { width: 10, height: 10 },
    tags: ['magazine', 'lovegood', 'spectrespecs', 'luna'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Megan Ruth Stay',
    file: '011-lovegood',
    element: (props: SVGProps<SVGSVGElement>) => <Svg011Lovegood {...props} />,
  },
  {
    id: 'sb15',
    name: 'Luna’s Lion Hat',
    size: { width: 10, height: 10 },
    tags: ['luna', 'lovegood', 'lion', 'hat'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Michelle Thompson',
    file: '012-luna-hat',
    element: (props: SVGProps<SVGSVGElement>) => <Svg012LunaHat {...props} />,
  },
  {
    id: 'sb16',
    name: 'Luna’s Lion Hat [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['luna', 'lovegood', 'lion', 'hat', 'embroidery'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Michelle Thompson',
    hasEmbroidery: true,
    file: '012-luna-hat2',
    element: (props: SVGProps<SVGSVGElement>) => <Svg012LunaHat2 {...props} />,
  },
  {
    id: 'sb17',
    name: 'Luna’s Spectrespecs',
    size: { width: 10, height: 10 },
    tags: ['luna', 'lovegood', 'spectrespecs', 'books', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '013-luna-spectrespecs',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg013LunaSpectrespecs {...props} />
    ),
  },
  {
    id: 'sb18',
    name: 'Mafalda’s Letter [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['mafalda', 'letter', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    hasEmbroidery: true,
    file: '014-mafalda',
    element: (props: SVGProps<SVGSVGElement>) => <Svg014Mafalda {...props} />,
  },
  {
    id: 'sb19',
    name: 'Omnioculars [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['omnioculars', 'embroidery'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Michelle Thompson',
    hasEmbroidery: true,
    file: '015-omnioculars',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg015Omnioculars {...props} />
    ),
  },
  {
    id: 'sb20',
    name: 'Pygmy Puff',
    size: { width: 10, height: 10 },
    tags: ['pygmy', 'puff', 'cage'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Wendi Riggens-Miller',
    file: '016-pygmy',
    element: (props: SVGProps<SVGSVGElement>) => <Svg016Pygmy {...props} />,
  },
  {
    id: 'sb21',
    name: 'Quidditch Goggles [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['quidditch', 'goggles', 'books', 'book', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    hasEmbroidery: true,
    designer: 'Michelle Thompson',
    file: '017-quidditch',
    element: (props: SVGProps<SVGSVGElement>) => <Svg017Quidditch {...props} />,
  },
  {
    id: 'sb22',
    name: 'Rememberall',
    size: { width: 10, height: 10 },
    tags: ['rememberall', 'books', 'book'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Michelle Thompson',
    file: '018-rememberall',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg018Rememberall {...props} />
    ),
  },
  {
    id: 'sb23',
    name: 'Ripped Book',
    size: { width: 10, height: 10 },
    tags: ['ripped', 'book', 'books'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Tereza Kulovaná',
    file: '019-ripped',
    element: (props: SVGProps<SVGSVGElement>) => <Svg019Ripped {...props} />,
  },
  {
    id: 'sb24',
    name: 'Rita Skeeter [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['rita', 'skeeter', 'book', 'books', 'embroidery'],
    type: 'supplemental',
    difficulty: 2,
    hasEmbroidery: true,
    designer: 'Daphne Seymour',
    file: '020-rita',
    element: (props: SVGProps<SVGSVGElement>) => <Svg020Rita {...props} />,
  },
  {
    id: 'sb25',
    name: 'Student Hat',
    size: { width: 10, height: 10 },
    tags: ['student', 'hat', 'book', 'books'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Wendi Riggens-Miller',
    file: '021-hat',
    element: (props: SVGProps<SVGSVGElement>) => <Svg021Hat {...props} />,
  },
  {
    id: 'sb26',
    name: 'Skelegro [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['skelegro', 'potion', 'books', 'book', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '022-skelegro',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => <Svg022Skelegro {...props} />,
  },
  {
    id: 'sb27',
    name: 'Wizard Chess Bookends – The Bishop - dark [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'bishop', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '023-bishop-dark',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg023BishopDark {...props} />
    ),
  },
  {
    id: 'sb28',
    name: 'Wizard Chess Bookends – The Bishop - light [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'bishop', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '023-bishop-light',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg023BishopLight {...props} />
    ),
  },
  {
    id: 'sb29',
    name: 'Wizard Chess Bookends – King and Queen - dark [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'king', 'queen', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '024-king-queen-dark',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg024KingQueenDark {...props} />
    ),
  },
  {
    id: 'sb30',
    name: 'Wizard Chess Bookends – King and Queen - light [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'king', 'queen', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '024-king-queen-light',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg024KingQueenLight {...props} />
    ),
  },
  {
    id: 'sb31',
    name: 'Wizard Chess Bookends – The Knight - dark [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'knight', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '025-knight-dark',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg025KnightDark {...props} />
    ),
  },
  {
    id: 'sb32',
    name: 'Wizard Chess Bookends – The Knight - light [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['wizard', 'chess', 'bookend', 'knight', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Michelle Thompson',
    file: '025-knight-light',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg025KnightLight {...props} />
    ),
  },
  {
    id: 'sb33',
    name: 'Bottle with Mortar & Pestle',
    size: { width: 10, height: 10 },
    tags: ['bottle', 'potion', 'mortar', 'pestle', 'book', 'books'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Tereza Kulovaná',
    file: '026-mortar',
    element: (props: SVGProps<SVGSVGElement>) => <Svg026Mortar {...props} />,
  },
  {
    id: 'sb34',
    name: 'Deluminator [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['deluminator', 'books', 'book', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Tereza Kulovaná',
    file: '027-deluminator',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg027Deluminator {...props} />
    ),
  },
  {
    id: 'sb35',
    name: 'Stained Glass Mermaid [embroidered]',
    size: { width: 3, height: 10 },
    tags: ['mermaid', 'stained', 'glass', 'embroidery'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Gretchen Kohlhaas',
    file: '028-mermaid',
    hasEmbroidery: true,
    element: (props: SVGProps<SVGSVGElement>) => <Svg028Mermaid {...props} />,
  },
  {
    id: 'sb36',
    name: 'Ravenclaw Diadem with Box',
    size: { width: 10, height: 10 },
    tags: ['diadem', 'box', 'books', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Jessica Lee Blacknall',
    file: '030-diadem',
    element: (props: SVGProps<SVGSVGElement>) => <Svg030Diadem {...props} />,
  },
  {
    id: 'sb37',
    name: 'Fleur’s Hat',
    size: { width: 10, height: 10 },
    tags: ['fleur', 'hat', 'books', 'book', 'butterfly'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Daphne Seymour',
    file: '031-fleur',
    element: (props: SVGProps<SVGSVGElement>) => <Svg031Fleur {...props} />,
  },
  {
    id: 'sb38',
    name: 'Ron’s Broken Wand',
    size: { width: 10, height: 10 },
    tags: ['ron', 'wand', 'broken', 'books', 'book'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Patty Fresonke',
    file: '032-ron',
    element: (props: SVGProps<SVGSVGElement>) => <Svg032Ron {...props} />,
  },
  {
    id: 'sb39',
    name: 'Round Eyed Monster Book of Monsters',
    size: { width: 10, height: 10 },
    tags: ['eye', 'monster', 'book', 'books'],
    type: 'supplemental',
    difficulty: 5,
    designer: 'Esther Wheat',
    file: '033-monster-book',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg033MonsterBook {...props} />
    ),
  },
  {
    id: 'sb41',
    name: 'Advanced Potion Making',
    size: { width: 10, height: 10 },
    tags: ['books', 'book', 'cauldron'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '034-advanced',
    element: (props: SVGProps<SVGSVGElement>) => <Svg034Advanced {...props} />,
  },
  {
    id: 'sb42',
    name: 'Dolores Umbridge’s Cat Plate',
    size: { width: 10, height: 10 },
    tags: ['umbridge', 'cat', 'picture'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Loretta Nardi',
    file: '035-umbridge',
    element: (props: SVGProps<SVGSVGElement>) => <Svg035Umbridge {...props} />,
  },
  {
    id: 'sb43',
    name: 'Draco as a Ferret & Mad Eye’s Wand',
    size: { width: 20, height: 10 },
    tags: ['draco', 'mad', 'eye', 'ferret', 'wand'],
    type: 'supplemental',
    difficulty: 5,
    designer: 'Daphne Seymour',
    file: '036-ferret',
    element: (props: SVGProps<SVGSVGElement>) => <Svg036Ferret {...props} />,
  },
  {
    id: 'sb44',
    name: 'Bella’s Wand & Books',
    size: { width: 10, height: 10 },
    tags: ['bellatrix', 'bella', 'wand', 'books', 'book'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Daphne Seymour',
    file: '037-bella',
    element: (props: SVGProps<SVGSVGElement>) => <Svg037Bella {...props} />,
  },
  {
    id: 'sb45',
    name: 'Raven',
    size: { width: 10, height: 10 },
    tags: ['raven', 'book', 'books'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Heidi Hansen',
    file: '038-raven',
    element: (props: SVGProps<SVGSVGElement>) => <Svg038Raven {...props} />,
  },
  {
    id: 'sb46',
    name: 'House Points',
    size: { width: 10, height: 10 },
    tags: [
      'house',
      'points',
      'gryffindor',
      'ravenclaw',
      'slytherin',
      'hufflepuff',
    ],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Tanya Searle',
    file: '039-house-points',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg039HousePoints {...props} />
    ),
  },
  {
    id: 'sb47',
    name: 'Lucius Malfoy’s Death Eater Mask',
    size: { width: 10, height: 10 },
    tags: [
      'lucius',
      'malfoy',
      'mask',
      'death',
      'eater',
      'wand',
      'book',
      'books',
    ],
    type: 'supplemental',
    difficulty: 5,
    designer: 'Daphne Seymour',
    file: '040-lucius',
    element: (props: SVGProps<SVGSVGElement>) => <Svg040Lucius {...props} />,
  },
  {
    id: 'sb48',
    name: 'Salazar Slytherin',
    size: { width: 10, height: 10 },
    tags: ['salazar', 'slytherin', 'wand', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '041-salazar',
    element: (props: SVGProps<SVGSVGElement>) => <Svg041Salazar {...props} />,
  },
  {
    id: 'sb49',
    name: 'Remus Lupin',
    size: { width: 10, height: 10 },
    tags: ['remus', 'lupin', 'wand', 'book', 'books', 'prefect', 'pin'],
    type: 'supplemental',
    difficulty: 5,
    designer: 'Daphne Seymour',
    file: '042-remus',
    element: (props: SVGProps<SVGSVGElement>) => <Svg042Remus {...props} />,
  },
  {
    id: 'sb50',
    name: 'Bella’s Dagger',
    size: { width: 10, height: 10 },
    tags: ['bellatrix', 'bella', 'dagger', 'book'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Daphne Seymour',
    file: '043-bella',
    element: (props: SVGProps<SVGSVGElement>) => <Svg043Bella {...props} />,
  },
  {
    id: 'sb51',
    name: 'Occlumency book',
    size: { width: 10, height: 10 },
    tags: ['occlumency', 'dagger', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '044-occlumency',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg044Occlumency {...props} />
    ),
  },
  {
    id: 'sb52',
    name: 'Dark Arts Crystal Ball',
    size: { width: 10, height: 10 },
    tags: ['dark', 'arts', 'crystal', 'ball', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Daphne Seymour',
    file: '045-dark-arts',
    element: (props: SVGProps<SVGSVGElement>) => <Svg045DarkArts {...props} />,
  },
  {
    id: 'sb53',
    name: 'Ministry of Magic Memos',
    size: { width: 10, height: 10 },
    tags: ['ministry', 'memos', 'book', 'paper', 'plane'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Heidi Hansen',
    file: '046-memos',
    element: (props: SVGProps<SVGSVGElement>) => <Svg046Memos {...props} />,
  },
  {
    id: 'sb54',
    name: 'Scabbers',
    size: { width: 10, height: 10 },
    tags: ['rat', 'scabbers', 'peter', 'pettigrew', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Heidi Hansen',
    file: '047-scabbers',
    element: (props: SVGProps<SVGSVGElement>) => <Svg047Scabbers {...props} />,
  },
  {
    id: 'sb55',
    name: 'Snape’s Wand',
    size: { width: 10, height: 10 },
    tags: ['snape', 'wand', 'patronus', 'doe', 'book', 'lily'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Daphne Seymour',
    file: '048-snape-wand',
    element: (props: SVGProps<SVGSVGElement>) => <Svg048SnapeWand {...props} />,
  },
  {
    id: 'sb56',
    name: 'Lily’s Goldfish Bowl',
    size: { width: 10, height: 10 },
    tags: ['lily', 'goldfish', 'bowl', 'fish'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Jennifer Larimore',
    file: '049-lilys-goldfish-bowl',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg049LilysGoldfishBowl {...props} />
    ),
  },
  {
    id: 'sb57',
    name: 'Pixie',
    size: { width: 10, height: 20 },
    tags: ['pixie', 'books', 'bookshelf', 'deathly', 'hallows'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Kirstin Viland',
    file: '050-pixie',
    element: (props: SVGProps<SVGSVGElement>) => <Svg050Pixie {...props} />,
  },
  {
    id: 'sb58',
    name: 'Spiderweb Corner',
    size: { width: 5, height: 5 },
    tags: ['spiderweb', 'spider', 'web', 'corner'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Holly Urbain',
    file: '051-spiderweb-corner-5x5',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg051SpiderwebCorner {...props} />
    ),
  },
  {
    id: 'sb59',
    name: 'Spiderweb Corner',
    size: { width: 10, height: 10 },
    tags: ['spiderweb', 'spider', 'web', 'corner'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Holly Urbain',
    file: '051-spiderweb-corner-10x10',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg051SpiderwebCorner {...props} />
    ),
  },
  {
    id: 'sb60',
    name: 'Wingardium Leviosa',
    size: { width: 10, height: 10 },
    tags: ['wingardium', 'leviosa', 'wand', 'feather', 'spell'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Holly Urbain',
    file: '052-wingardium-leviosa-10x10',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg052WingardiumLeviosa {...props} />
    ),
  },
  {
    id: 'sb61',
    name: 'Screaming Mandrake',
    size: { width: 10, height: 10 },
    tags: ['mandrake', 'herbology', 'pot'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Kirstin Viland',
    file: '053-screaming-mandrake',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg053ScreamingMandrake {...props} />
    ),
  },
  {
    id: 'sb62',
    name: 'Mistletoe with Books [embroidered]',
    size: { width: 10, height: 10 },
    tags: ['mistletoe', 'books', 'book', 'snowflake', 'embroidery'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Holly Urbain',
    hasEmbroidery: true,
    file: '054-mistletoe-with-books',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg054MistletoeWithBooks {...props} />
    ),
  },
  {
    id: 'sb63',
    name: 'Mistletoe [embroidered]',
    size: { width: 5, height: 5 },
    tags: ['mistletoe', 'embroidery'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Holly Urbain',
    hasEmbroidery: true,
    file: '055-mistletoe',
    element: (props: SVGProps<SVGSVGElement>) => <Svg055Mistletoe {...props} />,
  },
  {
    id: 'sb64',
    name: 'Gold Bars',
    size: { width: 10, height: 10 },
    tags: ['gold', 'bars', 'gringotts', 'books', 'book'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Jennifer Larimore',
    file: '056-gold-bars',
    element: (props: SVGProps<SVGSVGElement>) => <Svg056GoldBars {...props} />,
  },
  {
    id: 'sb65',
    name: 'Gold Coins 1',
    size: { width: 10, height: 10 },
    tags: ['gold', 'coins', 'galleons', 'gringotts', 'books', 'book'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Jennifer Larimore',
    file: '057-gold-coins-1',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg057GoldCoins1 {...props} />
    ),
  },
  {
    id: 'sb66',
    name: 'Gold Coins 2',
    size: { width: 10, height: 10 },
    tags: ['gold', 'coins', 'galleons', 'gringotts', 'books', 'book'],
    type: 'supplemental',
    difficulty: 1,
    designer: 'Jennifer Larimore',
    file: '058-gold-coins-2',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg058GoldCoins2 {...props} />
    ),
  },
  {
    id: 'sb67',
    name: 'Golden Egg',
    size: { width: 10, height: 10 },
    tags: ['golden', 'egg', 'triwizard', 'books', 'book'],
    type: 'supplemental',
    difficulty: 2,
    designer: 'Jennifer Larimore',
    file: '059-golden-egg',
    element: (props: SVGProps<SVGSVGElement>) => <Svg059GoldenEgg {...props} />,
  },
  {
    id: 'sb68',
    name: 'Niffler with Ring',
    size: { width: 10, height: 10 },
    tags: ['niffler', 'ring', 'gold', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Jennifer Larimore',
    file: '060-niffler-with-ring',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg060NifflerWithRing {...props} />
    ),
  },
  {
    id: 'sb69',
    name: 'Stag & Doe Bookends',
    size: { width: 20, height: 10 },
    tags: ['stag', 'doe', 'bookends', 'books', 'book', 'deer'],
    type: 'supplemental',
    difficulty: 4,
    designer: 'Holly Urbain',
    file: '061-stag-doe-bookends',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg061StagDoeBookends {...props} />
    ),
  },
  {
    id: 'sb70',
    name: 'Rita Skeeter in a Jar',
    size: { width: 10, height: 10 },
    tags: ['rita', 'skeeter', 'beetle', 'jar', 'books', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Holly Urbain',
    file: '062-rita-skeeter-in-a-jar',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg062RitaSkeeterInAJar {...props} />
    ),
  },
  {
    id: 'sb71',
    name: 'Ton Tongue Toffee',
    size: { width: 10, height: 10 },
    tags: ['ton', 'tongue', 'toffee', 'candy', 'books', 'book'],
    type: 'supplemental',
    difficulty: 3,
    designer: 'Holly Urbain',
    file: '063-ton-tongue-toffee',
    element: (props: SVGProps<SVGSVGElement>) => (
      <Svg063TonTongueToffee {...props} />
    ),
  },
]

export default supplementalBlocks
