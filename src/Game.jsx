import React, { useState, useEffect } from 'react';

const choices = ['piedra', 'papel', 'tijeras'];


const Game = () => {

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [countdown, setCountdown] = useState(0);
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
            setIsDisabled(false);
            resetGame();
        }
        return () => clearInterval(intervalId);
    }, [countdown, resetGame]);


    function handleChoice(choice) {
      if (playAgainst === 'computer') {
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
      } else {
          setPlayerChoice(choice);
          setComputerChoice(null);
          setResult('Esperando a otro jugador...');
          }
          
        setIsDisabled(false);
    }

    function handlePlayAgainst(option) {
      setPlayAgainst(option);
      resetGame();
      }

   function resetGame(){
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setIsDisabled(false);
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
onChange={() => handlePlayAgainst('computer')}
/>
Jugar contra la computadora
</label>
<label>
<input
type="radio"
name="playAgainst"
value="player"
checked={playAgainst === 'player'}
onChange={() => handlePlayAgainst('player')}
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