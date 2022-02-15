import { useState, useEffect } from 'react';
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

  const [ questions, setQuestions ] = useState([]);

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        const questionList = data.results.map(questionObj => {

          const answerArr = [];
          for (var i = 0; i < questionObj.incorrect_answers.length; i++) {
            answerArr.push({
              answer: questionObj.incorrect_answers[i],
              selected: false,
              isCorrect: false
            })
          }
          answerArr.push({
            answer: questionObj.correct_answer,
            selected: false,
            isCorrect: true
          });
          let answerList = answerArr
            .map(value => ({ value: value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }, id) => value)
            .map((item, key)=> ({
              ...item, 
              id: key
            }));
            console.log(answerList)

          return {
            ...questionObj,
            gameAnswers: answerList
          }
        })
        
        setQuestions(questionList);
      })


  }, []);

  useEffect(() => {
    console.log("you answered");
  }, [questions]);

  function handleAnswer (answer, questionKey) {
    console.log(answer, questionKey);
    setQuestions(prevQuestions => {
      let newQuestions = [];
      for (var i = 0; i < prevQuestions.length; i++) {
        if (i === questionKey) {
          console.log("it's ", i);
          newQuestions.push({
            ...prevQuestions[i],
            selected: !prevQuestions[i].selected
          })
        } else {
          console.log("just pushing at ", i);
          newQuestions.push(prevQuestions[i])
        }
      }
      console.log(newQuestions);
      setQuestions(newQuestions);
    })
  }

  const questionElements = questions.map((questionObj, questionKey) => {
        
    return (
      <Question 
        question={questionObj.question}
        gameAnswers={questionObj.gameAnswers}
        correctAnswer={questionObj.correct_answer}
        handleAnswer={handleAnswer}
        questionKey={questionKey}
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