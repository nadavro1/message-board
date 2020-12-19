import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { addMsg } from '../../actions/message'

// adding the message
const ComposeMessage = ({setAlert,addMsg,isSent}) => {
    const [formData,setFormData]= useState({
        subject:'',
        desc:'',
        type:'',
        phone:'',
        email:''
    });
    const {subject, desc, type, phone,email} = formData;
    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    if(isSent){//if message added we redirect to dashboard
        return <Redirect to="/dashboard"/>
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3 style={{marginTop: '2%'}}>Add Offer</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                if(isNaN(type) || type < 1 || type > 2){
                    setAlert("Please select type","danger",3000);
                }else addMsg(formData);
            }}>
                <input type="text" placeholder="Subject..." name="subject"  value={subject} onChange={e => onChange(e)}/>
                <textarea
                    name="desc"
                    cols="30"
                    rows="5"
                    placeholder="Write description..."
                    value = {desc}
                    onChange={e => onChange(e)}
                ></textarea>
                <select name="type" onChange={e => onChange(e)}>
                    <option value="0">Select Type</option>
                    <option value="1">Real estate</option>
                    <option value="2">Cars</option>
                </select>
                <input type="text" name="phone" placeholder="Phone..."  value={phone} onChange={e => onChange(e)}/>
                <input type="text" name="email" placeholder="Email..."  value={email} onChange={e => onChange(e)}/>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}

const mapStateToProps = state =>({ //to check if message is sent and redirect
    isSent:state.message.isSent
})


export default connect(mapStateToProps,{setAlert,addMsg})(ComposeMessage)
