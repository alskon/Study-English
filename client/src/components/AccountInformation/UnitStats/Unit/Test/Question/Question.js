import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question, index }) => {
    return (
        <div className='question-stat small'>
          {question.rightAnswer ? <i className="col-success far fa-check-circle"></i> : <i className="far fa-times-circle col-danger"></i>}
          <span className='question-name'>{ index }. { question.questionName } <p className='count-wrong-stat'>Total errors = 
            <span className={question.countWrongAnswer > 0 ? 'col-danger' : ''}> {question.countWrongAnswer}</span> </p></span> 
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Question;