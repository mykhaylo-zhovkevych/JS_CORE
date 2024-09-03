import React, { useState } from 'react';

function Hooks() {
  const [clicks, setClicks] = useState(0);

  function increment() {
      setClicks(prevClicks => prevClicks + 1);
  }

  return (
      <>
          <h1>Hooks</h1>
          <h2>some some</h2> 

          <button onClick={increment}>increment</button>
          {clicks}
          <hr />
      </>
  );
}

export default Hooks;
