import Konva from 'konva';

const WIDTH = 150;
const HEIGHT = 150;
const COLORS = [
  'ALICEBLUE',
  'ANTIQUEWHITE',
  'AQUA',
  'AQUAMARINE',
  'AZURE',
  'BEIGE',
  'BISQUE',
  'BLACK',
  'BLANCHEDALMOND',
  'BLUE',
  'BLUEVIOLET',
  'BROWN',
  'BURLYWOOD',
  'CADETBLUE',
  'CHARTREUSE',
  'CHOCOLATE',
  'CORAL',
  'CORNFLOWERBLUE',
  'CORNSILK',
  'CRIMSON',
  'CYAN',
  'DARKBLUE',
  'DARKCYAN',
  'DARKGOLDENROD',
  'DARKGRAY',
  'DARKGREEN',
  'DARKKHAKI',
  'DARKMAGENTA',
  'DARKOLIVEGREEN',
  'DARKORANGE',
  'DARKORCHID',
  'DARKRED',
  'DARKSALMON',
  'DARKSEAGREEN',
  'DARKSLATEBLUE',
  'DARKSLATEGRAY',
  'DARKTURQUOISE',
  'DARKVIOLET',
  'DEEPPINK',
  'DEEPSKYBLUE',
  'DIMGRAY',
  'DODGERBLUE',
  'FIREBRICK',
  'FLORALWHITE',
  'FORESTGREEN',
  'FUCHSIA',
  'GAINSBORO',
  'GHOSTWHITE',
  'GOLD',
  'GOLDENROD',
  'GRAY',
  'GREEN',
  'GREENYELLOW',
  'HONEYDEW',
  'HOTPINK',
  'INDIANRED',
  'INDIGO',
  'IVORY',
  'KHAKI',
  'LAVENDER',
  'LAVENDERBLUSH',
  'LAWNGREEN',
  'LEMONCHIFFON',
  'LIGHTBLUE',
  'LIGHTCORAL',
  'LIGHTCYAN',
  'LIGHTGOLDENRODYELLOW',
  'LIGHTGREEN',
  'LIGHTGREY',
  'LIGHTPINK',
  'LIGHTSALMON',
  'LIGHTSEAGREEN',
  'LIGHTSKYBLUE',
  'LIGHTSLATEGRAY',
  'LIGHTSTEELBLUE',
  'LIGHTYELLOW',
  'LIME',
  'LIMEGREEN',
  'LINEN',
  'MAGENTA',
  'MAROON',
  'MEDIUMAQUAMARINE',
  'MEDIUMBLUE',
  'MEDIUMORCHID',
  'MEDIUMPURPLE',
  'MEDIUMSEAGREEN',
  'MEDIUMSLATEBLUE',
  'MEDIUMSPRINGGREEN',
  'MEDIUMTURQUOISE',
  'MEDIUMVIOLETRED',
  'MIDNIGHTBLUE',
  'MINTCREAM',
  'MISTYROSE',
  'MOCCASIN',
  'NAVAJOWHITE',
  'NAVY',
  'OLDLACE',
  'OLIVE',
  'OLIVEDRAB',
  'ORANGE',
  'ORANGERED',
  'ORCHID',
  'PALEGOLDENROD',
  'PALEGREEN',
  'PALETURQUOISE',
  'PALEVIOLETRED',
  'PAPAYAWHIP',
  'PEACHPUFF',
  'PERU',
  'PINK',
  'PLUM',
  'POWDERBLUE',
  'PURPLE',
  'RED',
  'ROSYBROWN',
  'ROYALBLUE',
  'SADDLEBROWN',
  'SALMON',
  'SANDYBROWN',
  'SEAGREEN',
  'SEASHELL',
  'SIENNA',
  'SILVER',
  'SKYBLUE',
  'SLATEBLUE',
  'SLATEGRAY',
  'SNOW',
  'SPRINGGREEN',
  'STEELBLUE',
  'TAN',
  'TEAL',
  'THISTLE',
  'TOMATO',
  'TURQUOISE',
  'VIOLET',
  'WHEAT',
  'WHITE',
  'WHITESMOKE',
  'YELLOW',
  'YELLOWGREEN ',
];

const Test = (id) => {
  const stage = new Konva.Stage({
    container: id, // id of container <div>
    width: 500,
    height: 500,
  });
  const con = stage.container();
  let itemUrl = null;

  const updateItemUrl = (newUrl) => {
    itemUrl = newUrl;
  };

  // then create layer
  const layer = new Konva.Layer();

  const addDraggedImage = () => {
    if (itemUrl) {
      Konva.Image.fromURL(itemUrl, (image) => {
        const fill = Math.floor(Math.random() * COLORS.length);
        const { x, y } = stage.getPointerPosition();
        image.setAttrs({
          x: x - WIDTH / 2,
          y: y - HEIGHT / 2,
          width: WIDTH,
          height: HEIGHT,
          draggable: true,
          fill: COLORS[fill],
        });

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

  // create our shape
  // const circle = new Konva.Circle({
  //   x: stage.width() / 2,
  //   y: stage.height() / 2,
  //   radius: 70,
  //   fill: 'red',
  //   stroke: 'black',
  //   strokeWidth: 4,
  // });

  const draw = () => {
    // bg color
    con.style.backgroundColor = 'green';

    // add the shape to the layer
    // layer.add(circle);

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();
  };

  return {
    draw,
    updateItemUrl,
  };
};

export default Test;
