import { useState } from "react";
import { useEffect } from "react";
import Card from "./Components/Card";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [started, setStarted] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [gameOver, setGameover] = useState(false);
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, []);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  function handleClick() {
    const newPokemonData = [...pokemonData]; // Create a copy of the current array
    shuffleArray(newPokemonData); // Shuffle the copy
    setPokemonData(newPokemonData);
    console.log(pokemonData);
  }

  async function handleCardClick(pokemonId) {
    handleClick();
    setPokemonData((prevData) =>
      prevData.map((item) =>
        item.pokemon.id === pokemonId ? { ...item, clicked: true } : item
      )
    );
    setCount((prevCount) => prevCount + 1);
  }

  function handleStart() {
    if (pokemonData.length > 0) {
      setPokemonData((prevData) =>
        prevData.map((item) =>
          item["clicked"] == true ? { ...item, clicked: false } : item
        )
      );
      setStarted(true);
      setCount(0);
      return;
    }
    data.forEach((item) => {
      fetch(item["url"])
        .then((response) => response.json())
        .then((pokemon) => {
          setPokemonData((prevData) => [
            ...prevData,
            { pokemon: pokemon, clicked: false },
          ]);
        })
        .then(() => setStarted(true));
    });
  }

  return (
    <>
      {!started && (
        <div>
          <h1>Let's play!</h1>
          <h4>
            Get points by clicking on an image but don't click on any more than
            once!
          </h4>
          <button className="button" onClick={handleStart}>
            Start
          </button>
        </div>
      )}
      {started && !gameOver && (
        <div>
          <h4>Count:{count}</h4>
          {started && (
            <div id="cardContainer">
              {pokemonData.map((pokemon, index) => (
                <Card
                  key={index}
                  data={pokemon.pokemon}
                  clicked={pokemon.clicked}
                  onClick={() => {
                    pokemon.clicked == true && setGameover(true);
                    handleCardClick(pokemon.pokemon.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {started && gameOver && (
        <div>
          <h1>Game Over</h1>
          <button
            className="button"
            onClick={() => {
              handleStart();
              setGameover(false);
            }}
          >
            Restart
          </button>
        </div>
      )}
    </>
  );
}

export default App;
