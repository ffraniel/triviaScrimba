import './Question.css';

export default function Question (props) {
  
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const answerElements = props.question.gameOptions.map(option => {

    function passToHandler (e) {
      e.preventDefault();
      props.handleSelect(props.index, option)
    }

    const isSelected = props.answer ? props.answer === option ? "selected" : "" : "";
    const isCorrect = props.answer ? 
      props.question.correct_answer === option ?
        "correct" : "" 
      : "";
    const isSelectedAndIncorrect = props.answer ? 
      props.answer !== props.question.correct_answer ?
       props.answer === option ? "incorrect" : ""
      : ""
    : "";

    const btnClass = `
      answer-btn 
      ${isSelected} 
      ${props.showResults && "disabled"}
      ${props.showResults && isSelectedAndIncorrect} 
      ${props.showResults && isCorrect}`

      return (
        <li>
          <button 
            onClick={passToHandler}
            className={btnClass}
            disabled={props.showResults ? true : false}
          >{decodeHtml(option)}
          </button>
        </li>
      );
    })

  return (
    <div className="question">
      <h5 className="question-text">{decodeHtml(props.question.question)}</h5>
      <ul className="btn-list-container">
        {answerElements}
      </ul>
    </div>
  )
};