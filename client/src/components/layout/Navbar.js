import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth';

const  Navbar  = ({isAuthenticated,loading,logout}) => {
    // for signed in user
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/compose-message'>
                    <i className='fas fa-envelope-square' />{' '}
                    <span>Add Offer</span>
                </Link>
            </li>
            <li>
                <a href="#!" onClick={logout}>
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    )
    // for guest
    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className=""></i>Message Board</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
        </nav>
    )
}

const mapStateToProps=state=>{
    return {
        isAuthenticated:state.auth.isAuthenticated,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps,{logout})(Navbar)
