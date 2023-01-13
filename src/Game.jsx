import React, { useState, useEffect } from 'react';

const choices = ['piedra', 'papel', 'tijeras'];


const Game = () => {

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);


    useEffect(() => {
        let intervalId = null;
        if (countdown > 0) {
            setIsDisabled(true);
            intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsDisabled(false);
            resetGame();
        }
        return () => clearInterval(intervalId);
    }, [countdown, resetGame]);


    function handleChoice(choice) {
        setCountdown(3);
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
        setIsDisabled(false);
    }

   function resetGame(){
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
      }

    return (
        <div>
        <h1>Piedra, Papel o Tijeras</h1>
        <div>
          {choices.map((choice) => (
            <button key={choice} onClick={() => handleChoice(choice)} disabled={isDisabled}>
              {choice}
            </button>
          ))}
        </div>
        <p>{countdown > 0 ? countdown : ''}</p>
        <div>
          <p>Tu elección: {playerChoice}</p>
          <p>Elección de la computadora: {computerChoice}</p>
          <p>Resultado: {result}</p>
          <button onClick={resetGame}>Reiniciar juego</button>
        </div>
      </div>
    )
}

export default Game;