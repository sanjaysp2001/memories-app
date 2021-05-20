import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async(dispatch)=>{
    try {
        console.log(formData);
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch)=>{
    try {
        console.log(formData);
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}
