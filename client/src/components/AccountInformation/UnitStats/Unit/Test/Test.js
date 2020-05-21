import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question/Question'

const Test = ({ test }) => {
    return (
        <li>
            <div className = "test-name">
                <p>Test { test.testChapter }</p>               
            </div>  
            <div className='question-stats'>
                {test.questions.length > 0 ? 
                test.questions.map((question, index) => <Question key = { index } index = { index + 1 } question = { question }/>)
                 : <p className='small'>No questions</p>}                
            </div>  
        </li>
    );
};

Test.propTypes = {
    test: PropTypes.object.isRequired,
};

export default Test