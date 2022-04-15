/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Svg01Pixie from './images/js/beasts/01Pixie';

const beastsBlocks = [
  {
    id: 'fbb1',
    name: 'Cornish Pixie',
    size: { width: 7, height: 8.5 },
    tags: ['cornish', 'pixie'],
    type: 'beasts',
    difficulty: 4,
    designer: 'Michelle Thompson',
    file: '01-pixie',
    element: (props) => <Svg01Pixie {...props} />,
  },
];

export default beastsBlocks;
