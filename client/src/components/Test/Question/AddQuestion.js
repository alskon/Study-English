import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addQuestion } from '../../../actions/test'


const AddQuestion = ({ match, history, addQuestion }) => {
    const [questionForm, setQuestionForm] = useState({
        question:'',
        answer:''
    })
    
    const { question, answer } = questionForm
    
    const onChange = e => setQuestionForm({
        ...questionForm,
        [e.target.name]: e.target.value
    }) 

    const onSubmit = e => {
        e.preventDefault()
        addQuestion(match.params.chapter, question, answer, history)
    }
    return (
        <section className='work-section bg-dark'>          
                <div className='work-section-test'>
                    <h1 className='large'>Add new question</h1>
                    <form className='form' onSubmit={ e=>onSubmit(e) }>
                        <textarea name='question' placeholder="Please enter a question" required rows='3' cols='30' 
                            value={question} onChange={ e=>onChange(e) }></textarea> 
                        <textarea name='answer' placeholder="Please enter an answer to a question" 
                            required rows='3' cols='30' value={answer} onChange={ e=>onChange(e) }></textarea> 
                        <input type='submit' value='Add question' className='btn btn-submit' />
                    </form>
                </div>         
        </section>
    )

}

AddQuestion.propTypes = {
    match: PropTypes.object.isRequired,
    addQuestion:PropTypes.func.isRequired,
}

export default connect(null, { addQuestion }) (withRouter(AddQuestion))