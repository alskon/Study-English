import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import { loadUnits } from '../../actions/units'
import Loading from '../layout/Loading'
import Unit from './Unit/Unit'
import Alert from '../layout/Alert'

const Units = ({ loadUnits, auth: { admin }, units: { units, loading }, history }) => {
    useEffect(()=> {
        loadUnits(history)
    }, [loadUnits, history])
    const unitBlocks = loading ? <Loading /> :    
        units.map(unit => <Unit key={ unit.number } unit={ unit } /> )
    return (
            <section className='work-section bg-dark'>     
                <div className='work-section-register'>
                    <h1 className='x-large'>All tests</h1>
                    <Alert addClass = 'alert-test normal' />
                    { admin && !loading ? <Link className='add-unit' to='/add-unit'>Add unit</Link> : '' }                                        
                    <div className='units'>
                        { unitBlocks }
                    </div>
                </div>
            </section>
    )
};

const mapStateToProps = state => ({
    units: state.units,
    auth: state.auth
})

Units.propTypes = {
    loadUnits: PropTypes.func.isRequired,
    units: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loadUnits })(withRouter(Units));