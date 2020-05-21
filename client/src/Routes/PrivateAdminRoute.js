import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types';

const PrivateAdminRoute = ({ component: Component, auth: { admin }, ...rest }) => 

    <Route {...rest} render = { props => 
        !admin ? <Redirect to='/login' /> :
          <Component { ...props } />
         } 

    />

PrivateAdminRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateAdminRoute);