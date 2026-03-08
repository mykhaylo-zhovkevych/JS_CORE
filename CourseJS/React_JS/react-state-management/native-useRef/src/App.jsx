import { useRef, useEffect, useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const inputRef = useRef(null);

  // Changing a ref does not trigger a re-render, unlike state
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const idRef = useRef(4);
  const [names, setNames] = useState([
    {id: 1, name: "John"},
    {id: 2, name: "Jane"},
    {id: 3, name: "Jack"}
  ]);

  const onAddName = () => {
    setNames([...names, { id: idRef.current, name: inputRef.current.value}]);
    idRef.current += 1;
    inputRef.current.value = '';
  };

  return (
    <>
    <div>
      <div>
        {names.map((name) => (
          <div key={name.name}>{name.id}: {name.name}</div>
        ))}
      </div>
      <input type="text" ref={inputRef}></input>
      <button
        onClick={onAddName}
      >Add Name</button>
    </div>
    </>
  )
}

export default App
