/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Svg001Tentacles from './images/js/disney/001Tentacles';

const disneyBlocks = [
  {
    id: 'db1',
    name: 'Ursula’s Tentacles (from Disney bookcase)',
    size: { width: 10, height: 10 },
    tags: ['tentacle', 'tentacles', 'book', 'books'],
    type: 'disney',
    difficulty: 2,
    designer: 'Kathy Borrelli',
    file: '001-tentacles',
    element: (props) => <Svg001Tentacles {...props} />,
  },
];

export default disneyBlocks;
