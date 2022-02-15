import './Intro.css';
import blueBlob from '../images/blueBlob.png';
import yellowBlob from '../images/yellowBlob.png';

export default function Intro (props) {

  const backgroundStyle = {
    backgroundImage: `url(${blueBlob}), url(${yellowBlob})`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'bottom left, top right',
    backgroundSize:'300px, 300px' 
  };

  return (
    <main style={backgroundStyle} className="intro" >
      <div class="content">
        <h1 className="title">Quizzical</h1>
        <h3>Trivia quiz for the best!</h3>
        <button className="start-btn" onClick={()=> {props.setGameStarted(prev => !prev)}}>Start Quiz</button>
      </div>
    </main>
  )
};