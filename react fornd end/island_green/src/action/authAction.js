import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER} from './type';

export const registerUser= (userData,history) => dispatch=>{
    if(!userData.password && userData.token){
        axios
    .post('http://localhost:8080/api/users/registerSocial',userData)
    
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
    }else{
        axios
    .post('http://localhost:8080/api/users/register',userData)
    
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
    }
    
};

export const loginUser =  (userData,history) => dispatch =>{
    if(!userData.password && userData.token){
        axios
    .post('http://localhost:8080/api/users/loginSocial',userData)
    .then(res => {
        const {token} = res.data;

        localStorage.setItem('jwtToken',token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        // history.push('/dashboard')
        window.location = '/#/dashboard';

    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

    }else{
        axios
    .post('http://localhost:8080/api/users/login',userData)
    .then(res => {
        const {token} = res.data;

        localStorage.setItem('jwtToken',token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        // history.push('/dashboard')
        window.location = '/#/dashboard';

    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

    }
    
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload : decoded
    }
}

export const logoutUser =() => dispatch=>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}