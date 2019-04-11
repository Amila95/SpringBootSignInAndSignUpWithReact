import {SET_CURRENT_USER} from '../action/type';
import isEmpty from '../validation/isEmpty';

const initialState ={
    isAuthentication: false,
    user:{}
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
        return{
            ...state,
            isAuthentication: !isEmpty(action.payload),
            user: action.payload
        }
        default:
        return state;
    }
}