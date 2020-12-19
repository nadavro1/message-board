import {GET_ALL_MESSAGES, GET_LIMITED_MESSAGES,ADD_MESSAGE,DELETE_MESSAGE,MESSAGE_CLEAR} from './types'
import {setAlert} from './alert'
import axios from 'axios'

//get messages
export const getMsg= ()=>async (dispatch)=>{
    try {
      const res = await axios.get('/api/messages/all');
      dispatch({
          type:GET_ALL_MESSAGES,
          payload:res.data
      })
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
        dispatch({
            type:MESSAGE_CLEAR,
        })
    }

}

//get limited messages
export const getLimitedMsg= ()=>async (dispatch)=>{
    try {
      const res = await axios.get('/api/messages/limited');
      
      dispatch({
          type:GET_LIMITED_MESSAGES,
          payload:res.data
      })
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
        dispatch({
            type:MESSAGE_CLEAR,
        })
    }

}

//delete message
export const deleteMsg= (id)=>async (dispatch)=>{
    try {
      await axios.delete(`/api/messages/${id}`);
      
      dispatch({
          type:DELETE_MESSAGE,
          payload: id
      })
      dispatch(getMsg());
      dispatch(setAlert('this message has been deleted', 'success'));
    } catch (error) {
        console.log(error)
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}

//add message
export const addMsg= (formData)=>async (dispatch)=>{
    try {
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
     
      const res= await axios.post(`/api/messages/`,formData,config);

      dispatch({
          type:ADD_MESSAGE,
          payload: res.data
      })
      dispatch(getMsg());
      dispatch(setAlert('Your message has been posted', 'success'));
    } catch (error) {
        console.log(error)
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}