import React,{Fragment, useState} from 'react'
import {Link,Redirect} from  'react-router-dom';
import  {connect} from 'react-redux';
import  {setAlert} from '../../actions/alert';
import  {register} from '../../actions/auth';
const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFormData]= useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        level:''
    });
    
    const {name, email, password, password2,level} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit= async e=>{
        e.preventDefault();
        if (password!==password2) {
            setAlert("Passwords arent matched","danger",3000);
        }
        else if(isNaN(level) || level < 1 || level > 3){
            setAlert("Please select user level","danger",3000);
        }
        else{
            register(name, email, password,level);
        } 
    }
    if(isAuthenticated){
      return  <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" 
                    value={name} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" 
                    value={email} onChange={e => onChange(e)} 
                    />
                
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        
                        value={password} onChange={e => onChange(e)}
                        
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        
                        
                        value={password2} onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <select name="level" onChange={e => onChange(e)}>
                        <option value="0">Select user level</option>
                        <option value="1">Admin</option>
                        <option value="2">Paid user</option>
                        <option value="3">Unpaid user</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
             Already have an account? <Link to="/login">Sign In</Link>

            </p>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register);