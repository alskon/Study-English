import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Alert = ({ alerts, addClass }) => {
    const alert =  alerts !== null && alerts.length > 0 ? 
        alerts.map(alert => <div key={alert.id} className={`${addClass} alert-${alert.styleAlert}`}>{alert.msg}</div>) : ''
    return (
        <Fragment>
            {alert}
        </Fragment>
        
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    addClass: PropTypes.string,
};

const mapStateToProps = state => ({
    alerts : state.alerts
})
export default connect (mapStateToProps)(Alert);