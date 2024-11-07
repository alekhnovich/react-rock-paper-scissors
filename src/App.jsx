import { useState, useEffect } from 'react';
import './App.css';
import RockIcon from './assets/icon-rock.svg';
import PaperIcon from './assets/icon-paper.svg';
import ScissorsIcon from './assets/icon-scissors.svg';
import Rules from './assets/image-rules.svg';
import Close from './assets/icon-close.svg'


function App() {
  const choices = [
    { name: 'ROCK', color: 'red', icon: RockIcon },
    { name: 'PAPER', color: 'blue', icon: PaperIcon },
    { name: 'SCISSORS', color: 'yellow', icon: ScissorsIcon },
  ];
  
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [score, setScore] = useState(
    parseInt(localStorage.getItem('score')) || 0
  );
  const [result, setResult] = useState('');
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(prevShowRules => !prevShowRules);
  };
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
    if (outcome === 'lose') setScore(score - 1)
    setResult(outcome);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) return 'draw';
    if (
      (user.name === 'ROCK' && computer.name === 'SCISSORS') ||
      (user.name === 'PAPER' && computer.name === 'ROCK') ||
      (user.name === 'SCISSORS' && computer.name === 'PAPER')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  };

  return (
    <div className="game">
      <div className="header">
        <h1 className='name-of-game'>ROCK PAPER SCISSORS</h1>
        <div className='score-div'>
          <span className='score'>SCORE</span>
          <div className='score-value'>{score}</div>
        </div>
      </div>

      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className={`choice ${choice.color}`}
            onClick={() => playGame(choice)}
          >
            <img src={choice.icon} alt={choice.name} className="icon" />
          </button>
        ))}
      </div>


      <div className="result">
        <p>
          YOU PICKED: {userChoice.name}, THE HOUSE PICKED: {computerChoice.name}
        </p>
        <p>Результат: {result === 'win' ? 'Вы выиграли!' : result === 'lose' ? 'Вы проиграли!' : 'Ничья'}</p>
      </div>

      <button className="rules-button" onClick={toggleRules}>Rules</button>

      {showRules && <div className='overlay' onClick={toggleRules}></div>}  

      {showRules ? (
        <div className="rules-container">
          <div className='rules-header'>
            <h1>RULES</h1>
            <button onClick={toggleRules} className="close-rules-button">
              <img src={Close} alt="Close" className='close'/>
            </button>
          </div>
          <img src={Rules} alt="Rules" className='rules-image' />
        </div>
      ) : null}
    </div>
  );
}

export default App;
