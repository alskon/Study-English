import React from 'react'
import PropTypes from 'prop-types'
import Test from './Test/Test'

const Unit = ({ unit }) => {

    return (
        <div className='unit-stat bg-light'> 
            <div className="unit-header">
                <h2 className='large'>{ unit.unitNumber }</h2>
                <p className='normal'>Unit</p>
            </div>
            <div>
                { unit.tests.length > 0 ? 
                    <ul className='normal'>                        
                        { unit.tests.map((test, index) => 
                            <Test key={index} test = {test} /> ) 
                        }
                    </ul>
                    : <p>No test found</p> 
                } 
            </div>

        </div>    

    )

}

Unit.propTypes = {
    unit: PropTypes.object.isRequired,
}

export default Unit