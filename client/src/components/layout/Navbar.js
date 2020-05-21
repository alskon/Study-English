import React, {Fragment} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, admin }, logout }) => {
    return (<nav className='navbar bg-light'>
            <h1><Link to='/'>English Tests</Link></h1>
            <ul>
                { isAuthenticated ? 
                    <Fragment>
                        <li>
                            <Link to='/account'>Account</Link>
                        </li>
                        <li>
                            <Link to='/units'>Units</Link>
                        </li>
                        {admin ?
                            <li>
                                <Link to='/add-unit'>Add Unit</Link>
                            </li> : ''                
                        }
                        <li>                        
                            <button onClick={()=>logout()}>Logout</button>
                        </li> </Fragment> : 
                        <Fragment>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li> 
                        </Fragment>            
                }
            </ul>        
        </nav>)
    }

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout}) (Navbar);