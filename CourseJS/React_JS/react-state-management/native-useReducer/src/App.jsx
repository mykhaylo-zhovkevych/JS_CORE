import { useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) { 
      case "SET_NAME":
        return { ...state, name: action.payload};
        // state.name = action.payload;
        // return state;
      case "ADD_NAME":
        // Here the new state is created with a new name that comes from the action payload, and the existing names are spread into a new array, ensuring that we are not mutating the existing state directly.
         return { ...state, 
          names: [...state.names, state.name], 
          name: "" };
    }

  }, {
    names: [],
    name: "",
  });


  return <div className="App"> 
    <input 
      type='text' 
      value={state.name}
      onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })}>
    </input>
    <div>
      {state.names.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
    <button onClick={() => dispatch({type: "ADD_NAME"})}>Add Name</button>
  </div>;
}

export default App
