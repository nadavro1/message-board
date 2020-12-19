import {GET_ALL_MESSAGES,GET_LIMITED_MESSAGES,ADD_MESSAGE,DELETE_MESSAGE,MESSAGE_ERROR, MESSAGE_CLEAR} from '../actions/types';

const initialState= {
    messages:[],
    loading:true,
    isSent:false,
    error:{}
}

export default function(state = initialState,action){
    const {type,payload}=action;
    switch (type) {
        case GET_ALL_MESSAGES:
        case GET_LIMITED_MESSAGES:
            return {
                ...state,
                messages:payload,
                isSent:false,
                loading:false
            }
        case ADD_MESSAGE:
            return{
                ...state,
                loading:false,
                isSent:true,
                messages:[payload,...state.messages]
            }
        case DELETE_MESSAGE:
            return{
                ...state,
                loading:false,
                isSent:false,
                messages: state.messages.filter(message => (
                    message._id !== payload.id 
                ))
            }
        case MESSAGE_ERROR:
            return{
                ...state,
                error:payload,
                isSent:false,
                loading:false
            }
        case MESSAGE_CLEAR:
            return{
                ...state,
                messages:[],
                isSent:false,
                loading:false
            }
        default:
            return state;
    }
}