import { useState, useMemo } from 'react'
import './App.css'

function SortedList({ list, sortFunc }) {
  console.log('Rendering SortedList...');

    const sortedList = useMemo(() => { 
      console.log('Sorting list...');
      return [...list].sort(sortFunc); 
    }, [list, sortFunc]);
  return (
    <div>
      {sortedList.join(', ')}
    </div>

  )
}

function App() {
  const [numbers] = useState([10,20,30]);

  // Anything i read from should go into the dependency array.
  const total = useMemo(() => 
      numbers.reduce((acc, number) => acc + number, 0), 
    [numbers]
  );

  const [names] = useState(['John', 'Jane', 'Doe', 'Paul']);
  //const sortedNames = useMemo(() => [...names].sort(), [names]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const sortFunc = (a, b) => a.localeCompare(b) * -1;

  // This is not good example because it resolves a simple function.
  // Adding two numbers is almost free.
  // The result is just another number, so there is no object identity problem to optimize.
  const countTotal = useMemo(() => count1 + count2, [count1, count2]);

  return (
    <>
      <div>
        Total: {total}
      </div>
      <div>
        Names: {names.join(', ')}
      </div>
      {/* <div>
        sortedNames: {sortedNames.join(', ')}
      </div> */}
      <SortedList list={names} sortFunc={sortFunc} />

      <button onClick={() => setCount1(count1 + 1)}>Increment Count {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment Count {count2}</button>

      <div>{countTotal}</div>
    </>
  )
}

export default App
