import React, { useState } from 'react';
import axios from 'axios';

function Search() {
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
    <div className="Search">
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

export default Search;
