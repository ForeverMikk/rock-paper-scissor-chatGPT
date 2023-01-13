import React, { useState } from 'react';

const choices = ['piedra', 'papel', 'tijeras'];


const Game = () => {

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    function handleChoice(choice) {
        setPlayerChoice(choice);
        const randomIndex = Math.floor(Math.random() * choices.length);
        setComputerChoice(choices[randomIndex]);

        if (choice === computerChoice) {
        setResult('Empate');
        } else if (
        (choice === 'piedra' && computerChoice === 'tijeras') ||
        (choice === 'papel' && computerChoice === 'piedra') ||
        (choice === 'tijeras' && computerChoice === 'papel')
        ) {
        setResult('Ganaste');
        } else {
        setResult('Perdiste');
        }
    }

    return (
        <div>
        <h1>Piedra, Papel o Tijeras</h1>
        <div>
          {choices.map((choice) => (
            <button key={choice} onClick={() => handleChoice(choice)}>
              {choice}
            </button>
          ))}
        </div>
        <div>
          <p>Tu elección: {playerChoice}</p>
          <p>Elección de la computadora: {computerChoice}</p>
          <p>Resultado: {result}</p>
        </div>
      </div>
    )
}

export default Game;