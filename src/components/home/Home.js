import React from 'react';
import allBlocks from '../../assets/allBlocks';

const getBlockPath = (group, block) => {
  // 002-2.svg
  if (group.weekly) {
    const part1 = block.week.toString()
      .padStart(3, '0');
    return `${group.folder}/${part1}-${block.number}.svg`;
  }
  return `${group.folder}/${block.file}.svg`;
};

function Home() {
  return (
    <div style={{
      background: 'pink',
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gridGap: 8,
      padding: 8,
    }}
    >
      <div style={{ background: 'orange' }}>
        {allBlocks.map((group) => (
          <div>
            {group.name}
            <div style={{ background: 'red' }}>
              {group.blocks.map((block) => (
                <img
                  alt={block.name}
                  src={getBlockPath(group, block)}
                  width="100"
                  height="100"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'blue' }}>
        Main
      </div>
    </div>
  );
}

Home.propTypes = {};

export default Home;
