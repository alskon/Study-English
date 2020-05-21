import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createTest } from '../../../actions/test'

const AddTest = ({ match, createTest, history }) => {
    const [formTest, setFormTest] = useState({
        number: '',
        header:'',
        variation:''
    })
    const { number, header, variation } = formTest
    const onChange = e => setFormTest ({
        ...formTest,
        [e.target.name]: e.target.value
    })    
    const onSubmit = e => {
        e.preventDefault()
        createTest(match.params.unit_number, number, header, variation, history)
    }
    return (
        <section className='work-section bg-dark'>          
                <div className='work-section-test'>
                    <h1 className='large'>Unit {match.params.unit_number} - Add or update Test</h1>
                    <form className='form' onSubmit = { e => onSubmit(e) }>
                        <input type='number' name='number' min='1' max='99' placeholder="Test number" value={number} onChange={e=>onChange(e)} required/>
                        <p>Please enter a number (format x)</p>
                        <textarea name='header' placeholder="Test header" required rows='3' cols='30' value={header} onChange={e=>onChange(e)}/>
                        <p>Please enter a title of the test</p>
                        <input type='text' name='variation' placeholder="Variations" value={variation} onChange={e=>onChange(e)}/>
                        <p>Please enter possible variations (not required eg. dog, cat, cow)</p>
                        <input type='submit' value='Add test' className='btn btn-submit' />
                    </form>

                    </div>         
        </section>
    );
};

AddTest.propTypes = {
    match: PropTypes.object.isRequired,
};

export default connect(null, {createTest}) (withRouter(AddTest));