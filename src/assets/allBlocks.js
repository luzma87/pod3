import beastsBlocks from './beastsBlocks';
import disneyBlocks from './disneyBlocks';
import feetBlocks from './feetBlocks';
import otherBlocks from './otherBlocks';
import supplementalBlocks from './supplementalBlocks';
import topSidesBlocks from './topSidesBlocks';
import weeklyBlocks from './weeklyBlocks';

const rootFolder = 'assets/blocks';

const allBlocks = [
  {
    url: 'http://www.fandominstitches.com/2011/12/harry-potter-fantastic-beasts-magical.html',
    name: 'Fantastic Beasts',
    blocks: beastsBlocks,
    folder: `${rootFolder}/beasts`,
  },
  {
    url: 'http://www.fandominstitches.com/2012/12/disney-themed-bookcase-blocks.html',
    name: 'Disney Bookcase',
    blocks: disneyBlocks,
    folder: `${rootFolder}/disney`,
  },
  {
    url: 'http://www.fandominstitches.com/2015/07/harry-potter-bookcase-quilt-along.html#topsides',
    name: 'Bookcase feet',
    blocks: feetBlocks,
    folder: `${rootFolder}/feet`,
  },
  {
    url: 'http://www.fandominstitches.com/2011/05/harry-potter.html',
    name: 'Other HP Blocks',
    blocks: otherBlocks,
    folder: `${rootFolder}/others`,
  },
  {
    url: 'http://www.fandominstitches.com/2015/07/harry-potter-bookcase-quilt-along.html#supplemental',
    name: 'Supplemental Blocks',
    blocks: supplementalBlocks,
    folder: `${rootFolder}/supplemental`,
  },
  {
    url: 'http://www.fandominstitches.com/2015/07/harry-potter-bookcase-quilt-along.html#topsides',
    name: 'Sides, Top and Bottom',
    blocks: topSidesBlocks,
    folder: `${rootFolder}/sides-top`,
  },
  {
    url: 'http://www.fandominstitches.com/2015/07/harry-potter-bookcase-quilt-along.html#byme',
    name: 'Project of Doom Weekly Blocks',
    blocks: weeklyBlocks,
    folder: `${rootFolder}/weekly`,
    weekly: true,
  },
];

export default allBlocks;
