import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTest } from '../../../actions/test'
import { deleteUnit } from '../../../actions/units'

const Unit = ({ auth: { admin }, unit: { name, number, header, test }, deleteTest, deleteUnit }) =>  {

        const onClickDeleteTest = e => {
            e.preventDefault()
            deleteTest(e.target.name)
        }    

        const onClickDeleteUnit = e => {
            e.preventDefault()
            deleteUnit(e.target.name)
        }

        return (
            <div className='unit bg-light'>            
                <div className="unit-header">
                    <h2 className='large'>{ name }</h2>
                    <p className='normal'>{ header }</p>
                    { admin ? <input type="submit" name={number} value='Delete unit' onClick={ e => onClickDeleteUnit(e) } className='btn btn-delete'/> : '' }
                </div>                            
                <div className='unit-tests'>
                { admin ? <Link className='link-add-test normal' to={`/${number}/add-test`}>Add or update test</Link>: '' }
                    { test.length > 0 ? 
                        <ul className='normal'>                        
                            { test.map((test, index) => 
                                <li key={index}><Link to={`/test/${test}`} >{`Test ${test}`}</Link>
                                    { admin ? <input type="submit" name={test} value='Delete' onClick={ e => onClickDeleteTest(e) } className='btn btn-delete'/> : '' }
                                </li>) }
                        </ul>
                        : <p>No test found</p> }                            
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

Unit.propTypes = {
  unit: PropTypes.object.isRequired,  
  deleteTest: PropTypes.func.isRequired,
  deleteUnit: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { deleteTest, deleteUnit })(Unit)