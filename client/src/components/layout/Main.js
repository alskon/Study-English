import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const Main = ({ auth: { isAuthenticated, loading } }) => 
    isAuthenticated && !loading ? <Redirect to='/units' /> :
    <section className='work-section'>
        <div className='overlay'>
            <div className='work-section-main'>
                <h1 className='x-large'>English grammar tests</h1>
                <div className='menu-main-btn'>
                    <Link className='btn btn-light' to='/login'>Sign in</Link>
                    <Link className='btn btn-light' to='/register'>Sign up</Link>
                </div>
            </div>
        </div>
    </section> 

const mapStateToProps = state => ({
    auth: state.auth
})

Main.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Main)