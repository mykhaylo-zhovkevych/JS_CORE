import { useState } from 'react'

function NameList() {
  // Here it hold the reference to the array, so when we update the state, we need to create a new array with the updated values, otherwise we will be mutating the existing state directly, which is not recommended in React.
  const [list, setList] = useState(['Alice', 'Bob', 'Charlie']);
  const [name, setName] = useState(() => "jack");

  const onAddName = () => {
    // Why this is correct, because we are creating a new array with the spread operator and adding the new name to it, which ensures that we are not mutating the existing state directly.
    setList([...list, name]);
    setName('');
  };

  return (
    <div> 
      <ul>
        {list.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <input 
        type='text' 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onAddName}>Add</button>
    </div>
  );
}

function Counter() {

  // Each component has a separate state.
  const [count, setCount] = useState(10);
  const addOne = () => setCount(count + 1);
  return <div className="App">
    <button onClick={addOne}>Count = {count}</button>
  </div>
}

function App() {
  return <div className="App">
    <Counter />
    <Counter />
    <Counter />
    <NameList />
  </div>
}

export default App

/*
Scaller returned and pssed by value
array, object, function are passed by reference

function getState() {
let value = 42;
return value;
}

let myValue = getState();
myValue // 42
myValue = 100; 
myValue // 100


let myValue = getState();
myValueAgain; // 42

*/