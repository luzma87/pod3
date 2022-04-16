import Konva from 'konva';

// const shadowOffset = 20;
// const tween = null;
const blockSnapSize = 10;
const blockWidth = blockSnapSize * 10;
const blockHeight = blockSnapSize * 10;

const width = 500;
const height = 500;

const getGriddedPosition = (element) => ({
  x: Math.round(element.x() / blockSnapSize) * blockSnapSize,
  y: Math.round(element.y() / blockSnapSize) * blockSnapSize,
});

const Test = (id) => {
  const stage = new Konva.Stage({
    container: id, // id of container <div>
    width,
    height,
  });
  const con = stage.container();
  let item = null;

  const updateItem = (newItem) => {
    item = newItem;
  };

  /* GRID */
  const gridLayer = new Konva.Layer();
  const padding = blockSnapSize;
  for (let i = 0; i < width / padding; i += 1) {
    gridLayer.add(new Konva.Line({
      points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
      stroke: '#ddd',
      strokeWidth: 1,
    }));
  }

  gridLayer.add(new Konva.Line({ points: [0, 0, 10, 10] }));
  for (let j = 0; j < height / padding; j += 1) {
    gridLayer.add(new Konva.Line({
      points: [0, Math.round(j * padding), width, Math.round(j * padding)],
      stroke: '#ddd',
      strokeWidth: 0.5,
    }));
  }
  /* ENDGRID */

  // then create layer
  const layer = new Konva.Layer();

  const shadowRectangle = new Konva.Rect({
    x: 0,
    y: 0,
    width: blockWidth,
    height: blockHeight,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2],
  });
  shadowRectangle.hide();
  layer.add(shadowRectangle);

  const addDraggedImage = () => {
    if (item) {
      Konva.Image.fromURL(item.path, (image) => {
        const { x, y } = stage.getPointerPosition();
        image.setAttrs({
          x: x - blockWidth / 2,
          y: y - blockHeight / 2,
          width: blockWidth,
          height: blockHeight,
          draggable: true,
          name: 'object',
        });
        image.position(getGriddedPosition(image));

        image.on('mousedown touchstart', function () {
          this.moveToTop();
        });
        image.on('dragmove', () => {
          document.body.style.cursor = 'pointer';
        });
        /*
         * dblclick to remove image for desktop app
         * and dbltap to remove image for mobile app
         */
        image.on('dblclick dbltap', function () {
          this.destroy();
        });

        image.on('mouseover', () => {
          document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', () => {
          document.body.style.cursor = 'default';
        });
        image.on('click tap', () => {
          console.log('clicked', item);
        });
        image.on('dragstart', () => {
          shadowRectangle.show();
          shadowRectangle.moveToTop();
          image.moveToTop();
        });
        image.on('dragend', () => {
          image.position(getGriddedPosition(image));
          stage.batchDraw();
          shadowRectangle.hide();
        });
        image.on('dragmove', () => {
          shadowRectangle.position(getGriddedPosition(image));
          stage.batchDraw();
        });
        layer.add(image);
      });
    }
  };

  // drag listener
  con.addEventListener('dragover', (e) => {
    e.preventDefault(); // !important
  });
  con.addEventListener('drop', (e) => {
    e.preventDefault();
    // now we need to find pointer position
    // we can't use stage.getPointerPosition() here, because that event
    // is not registered by Konva.Stage
    // we can register it manually:
    stage.setPointersPositions(e);
    addDraggedImage();
  });

  // bg color
  con.style.backgroundColor = 'green';
  // const bg = new Konva.Rect({
  //   x: 0,
  //   y: 0,
  //   width: stage.width,
  //   height: stage.height,
  //   fill: 'pink',
  // });
  // layer.add(bg);

  // add the shape to the layer
  // layer.add(circle);

  // add the layer to the stage
  stage.add(gridLayer);
  stage.add(layer);

  // draw the image
  layer.draw();

  return {
    updateItem,
  };
};

export default Test;
