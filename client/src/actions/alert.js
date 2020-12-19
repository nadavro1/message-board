//will set alert and remove it after 5 seconds
import {SET_ALERT,REMOVE_ALERT} from './types';
export const setAlert= (msg,alertType,timeOut=5000) => dispatch => {
    const id = Math.random();
    dispatch({
        type: SET_ALERT,
        payload: {msg,alertType,id}
    });  

    setTimeout(()=>dispatch({
        type: REMOVE_ALERT,
        payload: id
    }),timeOut);
};


