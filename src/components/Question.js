import './Question.css';

export default function Question (props) {

    const answerElements = props.gameAnswers.map(answerObj => {
        return (
          <li>
            <button
              className="answer-btn"
              onClick={() => {props.handleAnswer(answerObj, props.questionKey)}}
              >{answerObj.answer}</button>
          </li>
        );
    })


  return (
    <div className="question">
      <h5 className="question-text">{props.question}</h5>
      <ul className="btn-list-container">
        {answerElements}
      </ul>
    </div>
  )
};