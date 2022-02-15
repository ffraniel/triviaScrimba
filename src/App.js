import './App.css';
import { useState, useEffect } from 'react';
import Game from './components/Game';
import Intro from './components/Intro';

function App() {

  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {!gameStarted && 
        <Intro setGameStarted={setGameStarted} />
        }
        {gameStarted && 
        <Game />
        }
    </div>
  );
}

export default App;
