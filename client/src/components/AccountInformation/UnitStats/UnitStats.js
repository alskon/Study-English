import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadStatistics } from '../../../actions/statistics'
import Loading from '../../layout/Loading'
import Unit from './Unit/Unit'

const UnitStats = ({ loadStatistics, statistics: {units, loading } }) => {
    useEffect(()=> {
        loadStatistics()
    }, [loadStatistics])
     return (
         loading ? <Loading /> : 
            <Fragment>  
                { units.length > 0 ? units.map( (unit, index) => 
                <Unit key={index} unit={unit}/>                   
                ) : 'No Statistics' }          
            </Fragment>    
    );
};

const mapStateToProps = state => ({
    statistics: state.statistics
})

UnitStats.propTypes = {
    loadStatistics: PropTypes.func.isRequired,
    statistics: PropTypes.object.isRequired,
};

 export default connect(mapStateToProps, {loadStatistics}) (UnitStats)