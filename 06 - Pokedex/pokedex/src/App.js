import React, { useState } from 'react';
import axios from 'axios';
import './css/Reset.css';
import './css/App.css';
import pkblimg from './static/pokeb.svg'
import Cards from './js/Cards';

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemonData, setPokemonData] = useState({});

  function searchForPokemon(event) {
    let APICallString = 'https://pokeapi.co/api/v2/pokemon/' + searchText.toLowerCase();

    axios.get(APICallString).then((response) => {
      setPokemonData(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="App">
        <header>
          <img src={pkblimg} alt="Pokedex" />
        </header>
        <div className="searchBar">
          <input placeholder="Pesquisar pokémon" type="text" onChange={e => setSearchText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchForPokemon(e)} />
        </div>
        <div class="title">
          <h1>Pokédex</h1>
        </div>     
      {JSON.stringify(pokemonData) !== '{}' ? 
        <>
          <p>{pokemonData.name}</p>
          <div>{pokemonData.types.map(el => {
            return <p>{el.type.name}</p>
          })}</div>
          <img src={pokemonData.sprites.front_default} alt="" />
        </>
        :
        <Cards />
      }
    </div>
  );
}

export default App;


