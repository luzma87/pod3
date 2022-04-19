import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Test from './Test';

function TestWrapper({ id, currentItem, onClick }) {
  const canvasArea = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!canvas) {
      const newChart = Test(id, onClick);
      setCanvas(newChart);
    } else if (currentItem) {
      canvas.updateItem(currentItem);
    }
  }, [canvas, currentItem]);

  return <div id={id} ref={canvasArea} />;
}

TestWrapper.defaultProps = {
  currentItem: null,
};

TestWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentItem: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

export default TestWrapper;
