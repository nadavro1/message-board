import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner.js'
import { deleteMsg, getLimitedMsg, getMsg } from '../../actions/message.js'
import Msg from './Msg.js'
const Dashboard= ({getMsg,getLimitedMsg,auth:{user},message:{messages,loading}})=> {
    useEffect(() => {
        if(user){
          user.level==3?getLimitedMsg():getMsg();//if its unpaid user it limit to 3 messages
        }
    },[getLimitedMsg,getMsg,user] )
    return loading ? <Spinner/>:<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      { messages.length!==0 && messages!==null?
      (<Msg messages={messages}/>)
        :<div>No offers on board</div>
      }
    </Fragment>
   
}


const mapStateToProps=state=>({
    auth: state.auth,
    message: state.message
    
})
export default connect(mapStateToProps,{getMsg,getLimitedMsg,deleteMsg})(Dashboard)
