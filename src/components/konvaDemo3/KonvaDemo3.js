/* eslint-disable jsx-a11y/alt-text */
import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TestWrapper from './js/TestWrapper';
import './konvaDemo3.css';

const blocks = {
  fourteen: {
    key: 'fourteen',
    path: '/assets/014-1.svg',
  },
  tentacles: {
    key: 'tentacles',
    path: '/assets/001.svg',
  },
};

function KonvaDemo3() {
  const dragItems = useRef(null);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const handleStartDrag = (e) => {
      setCurrentItem(blocks[e.target.id]);
    };
    dragItems.current.addEventListener('dragstart', handleStartDrag);

    return () => {
      dragItems.current.removeEventListener('dragstart', handleStartDrag);
    };
  }, []);

  const onClick = (element) => {
    console.log('OUTSIDE', element);
  };

  return (
    <div>
      <Typography>
        KonvaDemo3
      </Typography>
      <div ref={dragItems} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
        <div id="drag-items">
          {Object.entries(blocks).map(([key, block]) => (
            <img
              src={block.path}
              key={key}
              className="block-wrapper"
              id={key}
              draggable
            />
          ))}
        </div>
        <div style={{ background: 'hotpink' }}>
          <TestWrapper
            id="canvasContainer"
            currentItem={currentItem}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default KonvaDemo3;
