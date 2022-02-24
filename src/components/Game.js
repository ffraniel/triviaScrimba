import { useState, useEffect } from 'react';
import './Game.css';
import Question from './Question';
import blueBlob from '../images/blueBlob.png';
import yellowBlob from '../images/yellowBlob.png';
import ShuffleArray from '../utility/ShuffleArray';
import { nanoid } from 'nanoid'

export default function Game () {

  const backgroundStyleGame = {
    backgroundImage: `url(${blueBlob}), url(${yellowBlob})`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'bottom left, top right',
    backgroundSize:'170px, 170px' 
  };

  const [ questions, setQuestions ] = useState([]);

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        console.log("data: ", data.results)
        // for each item (map)
        // create array of answer and false answers
        // set ID 
        const manipulatedQuestionsArray = data.results.map(questionObj => {
          const questionID = nanoid();
          let updatedIncorrects = [...questionObj.incorrect_answers].map(answer => {
            return {
              answer: answer,
              isSelected: false,
              isCorrect: false,
              id: questionID,
              question: questionObj.question
            }
          });
          let updatedCorrect = {
            answer: questionObj.correct_answer,
            isSelected: false,
            isCorrect: true,
            id: questionID,
            question: questionObj.question
          };
          let options = [...updatedIncorrects, updatedCorrect];
          // shuffle
          let shuffledOptions = ShuffleArray(options);
           // attach t0 each question object
           
           return {
             ...questionObj,
             gameObject: shuffledOptions
            }
          });
      // set to state <<<<<<<<<<<
      setQuestions(manipulatedQuestionsArray);
      })
  }, []);

  useEffect(() => {
    

  }, [questions]);

  function handleSelect (answerObj) {
    let inputID = answerObj.id;
    let inputAnswer = answerObj.answer;
    console.log(inputID, inputAnswer);

    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map(prevQuestion => {
        const updatedGameObj = prevQuestion.gameObject.map(gameObjectAnswer => {
          if (gameObjectAnswer.id === inputID) {
            //update selected and return
            return {
              ...gameObjectAnswer,
              isSelected: true
            }
          } else {
            //return item unchanged
            return gameObjectAnswer;
          }
        });
        return updatedGameObj;

      })
      
      return updatedQuestions;
    })
  }

  const questionElements = questions.map(questionObj => {
        
    return (
      <Question 
        gameObj={questionObj.gameObject}
        question={questionObj.question}
        handleSelect={handleSelect}
        key={questionObj.id}
      />
      )
    }
  )

  return (
    <main className="game" style={backgroundStyleGame}>
      <div className="game-container">
        {questionElements}
      </div>
      <button className="submit">Check Answers</button>
    </main>
  )
};