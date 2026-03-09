import { useState, useEffect, createContext, useContext, useReducer, useCallback, useMemo } from 'react'

import './App.css'

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function usePokemonSource() : {
  pokemon: Pokemon[] | null;
  search: string;
  setSearch: (search: string) => void;
} {
  //const [pokemon, setPokemon] = useState<Pokemon[]>([])

  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
  }
  type PokemonAction = 
    { type: "setPokemon", payload: Pokemon[] } |
    {type: "setSearch"; payload: string };



  const [{pokemon, search}, dispatch] = useReducer((state: PokemonState, action: PokemonAction) => {
    switch (action.type) {
      case "setPokemon":
        return {...state, pokemon: action.payload};
      case "setSearch":
        // New state with an updated value
        return {...state, search: action.payload};
    }
  }, { 
    pokemon: [],
    search: "",

  })

  useEffect(() => {
    // Pokemon json gets at the runtime
    fetch("/pokemon.json")
    .then((response) => response.json())
    .then((data) => dispatch({
      type: "setPokemon",
      payload: data,
    }));
  }, []);


  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  // This useMemo trigger when either one of this both changes, this can mean a new api or a user input
  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).slice(0,20);
  }, [pokemon, search]);


  const sortedPokemon = useMemo(() => {
    // Coping the array to avoid mutating the original one, and then sorting it by name
    return [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredPokemon]);

  return { pokemon: sortedPokemon, search, setSearch }
}

function SearchBox()  {
  const { search, setSearch } = usePokemon();

  return (
    <input className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm" 
           placeholder="Search"
           value = {search}
           onChange={(e) => setSearch(e.target.value)}
    />
  )

}


const PokemonList = () => {
  const { pokemon } = usePokemon();

  return (
    <ul className="grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
      {pokemon.map((p) => (
        <li
          key={p.id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <img
              className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
              alt=""
            />
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{p.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

// const ThemeContext = createContext("light");
// One way is to allow it explicitly to be undefined, or make it uknown, which means that the value must be checked first.
const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>({} as unknown as ReturnType<typeof usePokemonSource>);

// defining a hook 
function usePokemon() {
  return useContext(PokemonContext);
}

function App() {

  const pokemonSource = usePokemonSource();

  return (
    <>

      {/* The Provider comes from the React and it is tought to bring something from the outside like the Pokemon */}
      {/* Any component inside me can access this value through useContext(PokemonContext). */}
      <PokemonContext.Provider value={ pokemonSource }>
        <div className="mx-auto max-w-3xl">
          <SearchBox />
          <PokemonList />
        </div>
        {/* Instead of passing the list through several layers of props, it can be better to use context when multiple nested components need the same data. */}
        {/* {<PokemonList pokemon={pokemon} />} */}
      </PokemonContext.Provider>

    </>
  )
}

export default App;