import { useState } from 'react';

const BBCHeader = ({ source }) => {
  const [state, setState] = useState({
    src: source,
    errored: false,
  });
  const onError = () => {
    if (!state.errored) {
      setState({
        src: null,
        errored: true,
      });
    }
  };
  return !state.src ? null : (
    <div className="bbc-tag">
      <img
        src={`/assets/bbc/${state.src}.png`}
        onError={onError}
        alt={state.src}
      />
    </div>
  );
};

export default BBCHeader;
