import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteQuestion } from '../../../actions/test'
import { putRightAnswer, countWrongAnswer } from '../../../actions/statistics'
import Loading from '../../layout/Loading'

const Question = ({ question: {
    _id,
    question,
    answer
    },
    auth: {
        loading,
        admin
    }, 
    testChapter, 
    deleteQuestion,
    putRightAnswer,
    countWrongAnswer
}) => {

    const [ formQuestion, setFormQuestion ] = useState({
        enteredAnswer: '',
        placeholder: 'Write answer',
        classInput: ''
    })

    const { enteredAnswer, placeholder, classInput } = formQuestion

    const onClickDeleteQuestion = e => {
        e.preventDefault()
        deleteQuestion(_id, testChapter)
    }

    const unitNumber = testChapter.split('.')[0]

    const onClick = () => {

        return (
            !enteredAnswer ? 
                (setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Please enter answer', classInput: 'bg-danger' }),
                setTimeout(() => {
                    setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Write answer', classInput: '' })
                }, 1500)) :
                enteredAnswer && answer.includes(enteredAnswer.charAt(0).toUpperCase() + enteredAnswer.slice(1).replace(/[.!?]/, '')) ? 
                    (setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Correct answer', classInput: 'bg-success' }), 
                    setTimeout(() => {
                        setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Write answer', classInput: '' })
                    }, 1500),
                    putRightAnswer(unitNumber, testChapter, _id)) : 
                enteredAnswer ? 
                    (setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Wrong answer', classInput: 'bg-danger' }),
                    setTimeout(() => {
                        setFormQuestion({ ...formQuestion, enteredAnswer:'', placeholder: 'Write answer', classInput: '' })
                    }, 1500),
                    countWrongAnswer(unitNumber, testChapter, _id)) : ''
        )
    }

    const questionField = loading ? <Loading /> : 
        <li>
            <p>{question}</p>   
            <input className={ classInput } type='text' placeholder={ placeholder } name='enteresAnswer' value={ enteredAnswer } autoComplete='off'
                onChange={e => setFormQuestion({ ...formQuestion, enteredAnswer: e.target.value })}/>
            <button type='submit' className='form-test-btn'><i className="fas fa-check" 
                onClick={ () => onClick() }></i></button> 
            { admin ? <button className='form-test-btn' type='submit' onClick={e => onClickDeleteQuestion(e)}> <i className="far fa-trash-alt"/></button> : '' }
        </li>
 
    return (
        <Fragment>
            { questionField }
        </Fragment>
    )
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    testChapter: PropTypes.string.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    putRightAnswer: PropTypes.func.isRequired,
    countWrongAnswer: PropTypes.func.isRequired,
}

const mapStateToProps =state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteQuestion, putRightAnswer, countWrongAnswer })(Question)