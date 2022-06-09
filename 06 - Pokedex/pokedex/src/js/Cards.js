import React from 'react';
import '../css/Reset.css'
import '../css/Cards.css'
import card1 from '../static/PokemonCard.svg';
import card2 from '../static/PokemonCard(1).svg';
import card3 from '../static/PokemonCard(2).svg';
import card4 from '../static/PokemonCard(3).svg';
import card5 from '../static/PokemonCard(4).svg';
import card6 from '../static/PokemonCard(5).svg';

function Cards () {
    return (
        <div className="cards">
            <img src={card1} alt="" />
            <img src={card2} alt="" />
            <img src={card3} alt="" />
            <img src={card4} alt="" />
            <img src={card5} alt="" />
            <img src={card6} alt="" />
        </div>
    )
}

export default Cards;