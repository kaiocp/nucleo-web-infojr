import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemonData, setPokemonData] = useState({});

  function searchForPokemon(event) {
    let APICallString = 'https://pokeapi.co/api/v2/pokemon/' + searchText;

    axios.get(APICallString).then((response) => {
      setPokemonData(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  // console.log(pokemonData);

  // pokemonData.types.forEach(el => {
  //   console.log(el.type.name)
  // });



  return (
    <div className="App">
      <div className="container">
        <h5>Poke Search</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPokemon(e)}>Search</button>
      </div>
      {JSON.stringify(pokemonData) !== '{}' ? 
        <>
          <p>{pokemonData.name}</p>
          <p>Aqui vao os tipos hihi</p>
          <img src={pokemonData.sprites.front_default} alt="" />
        </>
        :
        <><p>We dont have pokemon data</p></>
      }
    </div>
  );
}

export default App;
