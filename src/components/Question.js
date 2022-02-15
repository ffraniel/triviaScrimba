import './Question.css';

export default function Question () {


  return (
    <div className="question">
      <h5 className="question-text">How would one say goodbye in Spanish?</h5>
      <ul className="btn-list-container">
        <li>
          <button className="answer-btn">Adiós</button>
        </li>
        <li>
          <button className="answer-btn">Hola</button>
        </li>
        <li>
          <button className="answer-btn">Au Revoir</button>
        </li>
        <li>
          <button className="answer-btn">Salir</button>
        </li>
      </ul>
    </div>
  )
};