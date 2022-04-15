import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Test from './Test';

function TestWrapper({ id, currentUrl }) {
  const canvasArea = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!canvas) {
      const newChart = Test(id);
      setCanvas(newChart);
    } else {
      canvas.draw();
      if (currentUrl) canvas.updateItemUrl(currentUrl);
    }
  }, [canvas, currentUrl]);

  return <div id={id} ref={canvasArea} />;
}

TestWrapper.defaultProps = {
  currentUrl: null,
};

TestWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  currentUrl: PropTypes.string,
};

export default TestWrapper;
