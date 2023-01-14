import React, { useState, useEffect } from 'react';

const choices = ['piedra', 'papel', 'tijeras'];

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [isDisabled, setIsDisabled] = useState(false);
  const [playAgainst, setPlayAgainst] = useState('computer');

  useEffect(() => {
    let intervalId = null;
    if (countdown > 0) {
      setIsDisabled(true);
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      resetGame();
    }
    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleChoice = (choice) => {
    if (playAgainst === 'computer') {
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
    } else {
      setPlayerChoice(choice);
      setResult('Esperando elección del otro jugador');
    }
    setIsDisabled(false);
    setCountdown(3);
  }

  const handleOpponentChoice = (choice) => {
    if (playAgainst === 'person') {
      setComputerChoice(choice);
      if (playerChoice === choice) {
        setResult('Empate');
      } else if (
        (playerChoice === 'piedra' && choice === 'tijeras') ||
        (playerChoice === 'papel' && choice === 'piedra') ||
        (playerChoice === 'tijeras' && choice === 'papel')
      ) {
        setResult('Ganaste');
      } else {
        setResult('Perdiste');
      }
    }
  }

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  }

  return (
    <div>
      <h1>Piedra, Papel o Tijeras</h1>
      <div>
        <label>
          <input
            type="radio"
            name="playAgainst"
            value="computer"
            checked={playAgainst === 'computer'}
            onChange={(e) => setPlayAgainst(e.target.value)}
          />
          Jugar contra la computadora
        </label>
        <label>
          <input
            type="radio"
            name="playAgainst"
            value="person"
            checked={playAgainst === 'person'}
            onChange={(e) => setPlayAgainst(e.target.value)}
          />
          Jugar contra otra persona
        </label>
      </div>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)} disabled={isDisabled}>
            {choice}
          </button>
        ))}
      </div>
      {playAgainst === 'person' && (
        <div>
          <p>Elección del otro jugador:</p>
          {choices.map((choice) => (
            <button key={choice} onClick={() => handleOpponentChoice(choice)}>
              {choice}
            </button>
          ))}
        </div>
      )}
      <div><p>Tu elección: {playerChoice}</p>
        <p>Elección de la computadora: {computerChoice}</p>
        <p>Resultado: {result}</p>
        <p>{countdown > 0 ? countdown : ''}</p>
      </div>
    </div>
  );
}

export default Game;
