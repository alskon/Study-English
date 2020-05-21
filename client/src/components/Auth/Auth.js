import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alerts'
import { loginUser } from '../../actions/auth'
import Alert from '../layout/Alert'

const Auth = ({ loginUser, auth: { isAuthenticated, loading } }) => {
    const [loginForm, setLoginForm] = useState({
        email:'',
        password:''
    })
    const { email, password } = loginForm
    const onChange = e => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        loginUser(email, password)
    }
    return (
         isAuthenticated && !loading ? <Redirect to='/units' /> : 
        <section className='work-section bg-dark'>                
                <div className='work-section-login'>
                    <h1 className='large'>Login:</h1>  
                    <Alert addClass = 'alert-form' />
                    <form className='form' onSubmit={ e => onSubmit(e) }>
                        <input type='email' name='email' placeholder="Email" value = { email } onChange = { e=>onChange(e) } />
                        <input type='password' name='password' placeholder="Password" value={ password } autoComplete='off' onChange = { e=>onChange(e) }/>
                        <input type='submit' value='Sign in!' className='btn btn-submit' />
                    </form>
                </div>
        
        </section> 
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

Auth.propTypes = {
    setAlert: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
}

export default connect (mapStateToProps, { setAlert, loginUser })(Auth)