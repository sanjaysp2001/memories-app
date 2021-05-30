import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async(dispatch)=>{
    try {
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH , data});

        console.log(formData);
        router.push('/');
    } catch (error) {
        console.log(formData);
        console.log(error);
    }
}

export const signup = (formData, router) => async(dispatch)=>{
    try {
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH , data});
        console.log(formData);

        router.push('/');
    } catch (error) {
        console.log(error);
    }
}
