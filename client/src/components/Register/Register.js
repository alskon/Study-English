import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alerts'
import { registerUser } from '../../actions/auth'
import Alert from '../layout/Alert'

const Register = ({ setAlert, registerUser, auth: { isAuthenticated, loading } }) => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    })
    const { name, email, password, password2 } = registerForm
    const onChange = e => setRegisterForm ({ ...registerForm, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        return (password !== password2) ? 
            setAlert('Passwords don\'t matches', 'danger') : 
            registerUser(name, email, password)        
    }
    return (
        isAuthenticated && !loading ? <Redirect to='/units' /> :
        <section className='work-section bg-dark'>            
                <div className='work-section-register'>
                    <h1 className='large'>Registration:</h1>
                    <Alert addClass= 'alert-form' />
                    <form className='form' onSubmit = {e => onSubmit(e)}>
                        <input type='text' required name='name' placeholder="Name" value={name} onChange = {e => onChange(e)}/> 
                        <input type='email' name='email' placeholder="Email" value={email} onChange = {e => onChange(e)}/>
                        <input type='password' name='password' autoComplete='off' placeholder="Password" minLength="6" value={password} onChange = {e => onChange(e)}/>
                        <input type='password' name='password2' autoComplete='off' placeholder="Confirm Password" value = {password2} onChange = {e => onChange(e)}/>
                        <input type='submit' value='Register' className='btn btn-submit'/>
                    </form>
                </div>
        </section>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {setAlert, registerUser})(Register);