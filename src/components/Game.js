import { useState, useEffect } from 'react';
import './Game.css';
import Question from './Question';
import blueBlob from '../images/blueBlob.png';
import yellowBlob from '../images/yellowBlob.png';
import ShuffleArray from '../utility/ShuffleArray';
import { nanoid } from 'nanoid'
import shuffleArray from '../utility/ShuffleArray';

export default function Game () {

  const backgroundStyleGame = {
    backgroundImage: `url(${blueBlob}), url(${yellowBlob})`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'bottom left, top right',
    backgroundSize:'170px, 170px' 
  };

  const [ questions, setQuestions ] = useState([]);
  const [ answers, setAnswers] = useState([]);
  const [ showResults, setShowResults ] = useState(false);
  const [ score, setScore ] = useState(null);

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        const arrayQuestionData = data.results.map(questionItem => {
          let allAnswers = [...questionItem.incorrect_answers, questionItem.correct_answer];
          let shuffledAnswers = shuffleArray(allAnswers);
          return {
            ...questionItem,
            gameOptions: shuffledAnswers
          }
        })
        setQuestions(arrayQuestionData)
      })
  }, []);

  useEffect(() => {
    

  }, [questions]);

  function handleSelect (index, answer) {
    setAnswers(prevAnswers => {
      let newAnswers = [...prevAnswers];
      newAnswers[index] = answer;     
      return newAnswers;
    })
  };

  function handleSubmit (e) {
    e.preventDefault();
    if (answers.length === 5) {
      if (answers.every(answer => answer && answer.length > 0)) {
        let scoreCalc = answers.filter((answer, index) => {
          return answer === questions[index].correct_answer;
        }).length;
        setScore(scoreCalc);
        setShowResults(true);
      } else {
        alert("Please answer all the questions first");
      }
    } else {
      alert("Please answer all the questions first");
    }
  }
  function restart () {
    setAnswers([]);
    setShowResults(false);
    setScore(null);
    setQuestions([]);
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(res => res.json())
    .then(data => {
      const arrayQuestionData = data.results.map(questionItem => {
        let allAnswers = [...questionItem.incorrect_answers, questionItem.correct_answer];
        let shuffledAnswers = shuffleArray(allAnswers);
        return {
          ...questionItem,
          gameOptions: shuffledAnswers
        }
      })
      setQuestions(arrayQuestionData)
    })
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question 
        question={question}
        index={index}
        answer={answers[index]}
        setAnswers={setAnswers}
        handleSelect={handleSelect}
        showResults={showResults}
        id={nanoid()}
      />
      )
  });

  return (
    <main className="game" style={backgroundStyleGame}>
      <div className="game-container">
        {questionElements}
      </div>
      {showResults && 
      <div className="score-container">
        <h3>You got {score} out of 5!</h3>
      </div>
      }
      {!showResults &&
      <button className="submit" onClick={handleSubmit}>Check Answers</button>
      }
      {showResults && 
      <button className="submit" onClick={restart}>Restart</button>
      }
    </main>
  )
};