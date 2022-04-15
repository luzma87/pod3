import beastsBlocks from '../beastsBlocks';
import customBlocks from '../customBlocks';
import disneyBlocks from '../disneyBlocks';
import otherBlocks from '../otherBlocks';
import supplementalBlocks from '../supplementalBlocks';
import topSidesBlocks from '../topSidesBlocks';
import weeklyBlocks from '../weeklyBlocks';

const blockTransformer = {
  find: (id, props) => {
    let allBlocks = [];
    allBlocks = [...allBlocks, ...weeklyBlocks];
    allBlocks = [...allBlocks, ...supplementalBlocks];
    allBlocks = [...allBlocks, ...topSidesBlocks];
    allBlocks = [...allBlocks, ...otherBlocks];
    allBlocks = [...allBlocks, ...beastsBlocks];
    allBlocks = [...allBlocks, ...disneyBlocks];
    allBlocks = [...allBlocks, ...customBlocks];

    const found = allBlocks.find(b => b.id === id);
    if (found) {
      return found.element(props);
    }
    return null;
  },
};

export default blockTransformer;
