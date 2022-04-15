/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Svg001Herbology from './images/js/custom/001Herbology';
import Svg002Molly from './images/js/custom/002Molly';
import Svg002Molly2 from './images/js/custom/002Molly2';
import Svg003Pixie1 from './images/js/custom/003Pixie1';
import Svg003Pixie2 from './images/js/custom/003Pixie2';
import Svg003Pixie3 from './images/js/custom/003Pixie3';
import Svg003Pixie4 from './images/js/custom/003Pixie4';
import Svg004Pixie from './images/js/custom/004Pixie';
import Svg004Pixie2 from './images/js/custom/004Pixie2';
import Svg004Pixie3 from './images/js/custom/004Pixie3';
import Svg005Pixie from './images/js/custom/005Pixie';
import Svg006Pygmy from './images/js/custom/006Pygmy';
import Svg007Ripped from './images/js/custom/007Ripped';
import Svg008Tentacles from './images/js/custom/008Tentacles';
import Svg0093Bros from './images/js/custom/0093Bros';
import Svg010Venomous from './images/js/custom/010Venomous';

const customBlocks = [
  {
    id: 'cb1',
    name: 'Herbology',
    size: { width: 10, height: 10 },
    tags: ['herbology', 'mimbulus', 'mimbletonia', 'mandrake', 'pot', 'potted', 'plant', 'plants', 'book', 'books'],
    type: 'custom',
    difficulty: 4,
    designer: 'Schenley Pilgram / Cat Magraith (modified)',
    file: '001-herbology',
    element: (props) => <Svg001Herbology {...props} />,
  },
  {
    id: 'cb2',
    name: 'Molly’s Knitting with yarn ball',
    size: { width: 10, height: 10 },
    tags: ['molly', 'weasley', 'knitting', 'knit', 'yarn', 'ball'],
    type: 'custom',
    difficulty: 2,
    designer: 'Michelle Thompson (modified)',
    file: '002-molly',
    element: (props) => <Svg002Molly {...props} />,
  },
  {
    id: 'cb3',
    name: 'Molly’s Knitting with yarn ball',
    size: { width: 10, height: 10 },
    tags: ['molly', 'weasley', 'knitting', 'knit', 'yarn', 'ball'],
    type: 'custom',
    difficulty: 2,
    designer: 'Michelle Thompson (modified)',
    file: '002-molly2',
    element: (props) => <Svg002Molly2 {...props} />,
  },
  {
    id: 'cb4',
    name: 'Pixie with books',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '003-pixie1',
    element: (props) => <Svg003Pixie1 {...props} />,
  },
  {
    id: 'cb5',
    name: 'Pixie with books',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '003-pixie2',
    element: (props) => <Svg003Pixie2 {...props} />,
  },
  {
    id: 'cb6',
    name: 'Pixie with books',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '003-pixie3',
    element: (props) => <Svg003Pixie3 {...props} />,
  },
  {
    id: 'cb7',
    name: 'Pixie with books',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '003-pixie4',
    element: (props) => <Svg003Pixie4 {...props} />,
  },
  {
    id: 'cb8',
    name: 'Pixie with rememberall',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books', 'rememberall'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '004-pixie',
    element: (props) => <Svg004Pixie {...props} />,
  },
  {
    id: 'cb9',
    name: 'Pixie with rememberall',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books', 'rememberall'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '004-pixie2',
    element: (props) => <Svg004Pixie2 {...props} />,
  },
  {
    id: 'cb10',
    name: 'Pixie with rememberall',
    size: { width: 10, height: 10 },
    tags: ['cornish', 'pixie', 'book', 'books', 'rememberall'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Jennifer Ofenstein (modified)',
    file: '004-pixie3',
    element: (props) => <Svg004Pixie3 {...props} />,
  },
  {
    id: 'cb11',
    name: 'Pixie with lantern',
    size: { width: 10, height: 20 },
    tags: ['cornish', 'pixie', 'lantern'],
    type: 'custom',
    difficulty: 5,
    designer: 'Michelle Thompson / Wendi Riggens-Miller (modified)',
    file: '005-pixie',
    element: (props) => <Svg005Pixie {...props} />,
  },
  {
    id: 'cb12',
    name: 'Pygmy Puff (based on the puffskein pattern)',
    size: { width: 10, height: 10 },
    tags: ['pygmy', 'puff', 'book', 'books'],
    type: 'custom',
    difficulty: 5,
    designer: 'Vanda Chittenden (modified)',
    file: '006-pygmy',
    element: (props) => <Svg006Pygmy {...props} />,
  },
  {
    id: 'cb13',
    name: 'Ripped books',
    size: { width: 10, height: 10 },
    tags: ['ripped', 'book', 'books'],
    type: 'custom',
    difficulty: 2,
    designer: 'Tereza Kulovaná (modified)',
    file: '007-ripped',
    element: (props) => <Svg007Ripped {...props} />,
  },
  {
    id: 'cb14',
    name: 'Tentacled book',
    size: { width: 10, height: 10 },
    tags: ['tentacle', 'tentacles', 'book', 'books'],
    type: 'custom',
    difficulty: 2,
    designer: 'Kathy Borrelli (modified)',
    file: '008-tentacles',
    element: (props) => <Svg008Tentacles {...props} />,
  },
  {
    id: 'cb15',
    name: 'Tale of 3 brothers',
    size: { width: 10, height: 10 },
    tags: ['tale', 'brothers', 'three', 'beedle', 'bard', 'book', 'books'],
    type: 'custom',
    difficulty: 4,
    designer: 'Jennifer Ofenstein/Michelle Thompson/Melodye Wood Marks (modified)',
    file: '009-3bros',
    element: (props) => <Svg0093Bros {...props} />,
  },
  {
    id: 'cb16',
    name: 'Venomous Tentacula',
    size: { width: 10, height: 10 },
    tags: ['picture', 'venomous', 'tentacula'],
    type: 'custom',
    difficulty: 4,
    designer: 'Jennifer Ofenstein',
    file: '010-venomous',
    element: (props) => <Svg010Venomous {...props} />,
  },
];

export default customBlocks;
