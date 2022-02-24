import './Question.css';

export default function Question (props) {

    const answerElements = props.gameObj.map(gameAnswerObj => {
        return (
         <li>
            <button onClick={()=>{props.handleSelect(gameAnswerObj)}}>
              Answer: {gameAnswerObj.answer}
              <br/>
              is selected {gameAnswerObj.isSelected ? "yes": "non"}
              <br/>
              is correct {gameAnswerObj.isCorrect ? "yes": "non"}
              </button>
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