import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addUnit } from '../../../actions/units'

const AddUnit = ({ addUnit, history }) => {
    const [unitForm, setUnitForm] = useState ({
        number:'',
        header:''
    })
    const { number, header } = unitForm
    const onChange = e => setUnitForm({
        ...unitForm,
        [e.target.name]: e.target.value
    })
    const onSubmit = e => {
        e.preventDefault()
        addUnit(number, header, history)

    }
    return (
        <section className='work-section bg-dark'>          
                <div className='work-section-test'>
                    <h1 className='large'>Add unit</h1>
                    <form className='form' onSubmit={ e=>onSubmit(e) }>
                        <input type='text' name='number' pattern='[0-9]{1,3}' placeholder="Unit number" value={number} required onChange={ e=>onChange(e) }/>
                        <p>Please enter unit number (format x)</p>
                        <textarea name='header' placeholder="Unit header" required rows='3' cols='30' value={header} onChange={ e=>onChange(e) }></textarea> 
                        <p>Please enter a title of the unit</p>
                        <input type='submit' value='Add unit' className='btn btn-submit' />
                    </form>
                </div>         
        </section>
    );
};

AddUnit.propTypes = {
    addUnit: PropTypes.func.isRequired,
}

export default connect(null, { addUnit })(withRouter(AddUnit));