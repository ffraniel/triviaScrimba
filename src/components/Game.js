import './Game.css';
import Question from './Question';
import blueBlob from '../images/blueBlob.png';
import yellowBlob from '../images/yellowBlob.png';

export default function Game () {

  const backgroundStyleGame = {
    backgroundImage: `url(${blueBlob}), url(${yellowBlob})`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'bottom left, top right',
    backgroundSize:'170px, 170px' 
  };

  return (
    <main className="game" style={backgroundStyleGame}>
      <div className="game-container">
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
      <button className="submit">Check Answers</button>
    </main>
  )
};