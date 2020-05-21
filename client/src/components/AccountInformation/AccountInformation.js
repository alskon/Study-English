import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Loading from '../layout/Loading'
import UnitStats from './UnitStats/UnitStats'
import { deleteUser } from '../../actions/auth'

const AccountInformation = ({ auth: { user, loading }, deleteUser 
    }) => {
    const unit = <UnitStats />    
    const onClick = e => {
        e.preventDefault()
        deleteUser()
    }
    return (
       loading ? <Loading /> :
        <section className='work-section bg-dark'>          
            <div className='work-section-test'>
                <h1 className='large'>User's information:</h1>
                <div>
                    <ul>
                        <li>
                            <p className='normal'>Name: <span>{ user.name }</span></p>
                        </li>
                        <li>
                            <p className='normal'>Email: <span>{ user.email }</span></p>
                        </li>
                        <li>
                            <p className='normal'>Access role: <span>{ user.admin ? 'Admin' : 'Common' }</span> </p>
                        </li>
                        <li>
                            <p className='normal'>Registration's Date (YYYY-MM-DD): <span>{ user.date.split('T')[0] }</span></p>
                        </li>
                    </ul>                                                                                               
                </div>
                <input type="submit" value='Delete user' onClick={ e => onClick(e) } className='btn btn-delete-user'/>
                <h1 className='large'>Results:</h1>
                { unit }
            </div>         
        </section>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})

AccountInformation.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteUser:PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteUser })(AccountInformation);