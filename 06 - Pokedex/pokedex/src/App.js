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
        <div className="title">
          <h1>Pokédex</h1>
        </div>     
      {JSON.stringify(pokemonData) !== '{}' ? 
        <div className="searchCard">
          <div className="searchCard__info">
            <h2>{pokemonData.name}</h2>
            <div className="searchCard__info-types">
              {pokemonData.types.map(el => {
              return <p>{el.type.name}</p>
              })}
            </div>
          </div>
          <img className="searchCard__img" src={pokemonData.sprites.front_default} alt="" />
        </div>
        :
        <Cards />
      }
    </div>
  );
}

export default App;


