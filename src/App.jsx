import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const choices = [
    { name: 'rock', color: 'red', icon: '✊' },
    { name: 'paper', color: 'blue', icon: '✋' },
    { name: 'scissors', color: 'yellow', icon: '✌️' },
  ];
  
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [score, setScore] = useState(
    parseInt(localStorage.getItem('score')) || 0
  );
  const [result, setResult] = useState('');

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();
    setUserChoice(userChoice);
    setComputerChoice(computerChoice);

    const outcome = determineWinner(userChoice, computerChoice);
    if (outcome === 'win') setScore(score + 1);
    setResult(outcome);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) return 'draw';
    if (
      (user.name === 'rock' && computer.name === 'scissors') ||
      (user.name === 'paper' && computer.name === 'rock') ||
      (user.name === 'scissors' && computer.name === 'paper')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  };

  return (
    <div className="game">
      <div className="header">
        <h1>Rock Paper Scissors</h1>
        <div className="score">Score: {score}</div>
      </div>

      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className={`choice ${choice.color}`}
            onClick={() => playGame(choice)}
          >
            <span className="icon">{choice.icon}</span>
          </button>
        ))}
      </div>

      <div className="result">
        <p>
          Вы выбрали: {userChoice.icon}, Компьютер выбрал: {computerChoice.icon}
        </p>
        <p>Результат: {result === 'win' ? 'Вы выиграли!' : result === 'lose' ? 'Вы проиграли!' : 'Ничья'}</p>
      </div>

      <button className="rules">Rules</button>
    </div>
  );
}

export default App;
