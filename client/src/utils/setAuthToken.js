import axios from 'axios';
// add or delete token from the header
const  setAuthToken=(token)=>{
    if(token)
        axios.defaults.headers.common['x-auth-token'] = token;
    else
        delete axios.defaults.headers.common['x-auth-token'];
    
}

export default setAuthToken;