import React from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

function KonvaDemo() {
  const [image, status] = useImage('/assets/001.svg');

  console.log({ status });

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image image={image} x={200} y={200} />
        </Layer>
      </Stage>
    </div>
  );
}

KonvaDemo.propTypes = {};

export default KonvaDemo;
