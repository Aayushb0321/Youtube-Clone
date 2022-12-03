import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import auth from '../../firebase.js';
import { _FAILED, _LOGOUT, _PROFILE, _REQUEST, _SUCCESS } from '../authActions.js';

export const Login = ()=> async dispatch =>{

    try {
        dispatch({
            type:_REQUEST
        })
        const provider= new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

        const response= await auth.signInWithPopup(provider);
        // console.log(response);

        const accessToken=response.credential.accessToken;
        const profile={
            name:response.user.displayName,
            picture:response.user.photoURL
        }

        sessionStorage.setItem('app-accessToken',accessToken);
        sessionStorage.setItem('app-user',JSON.stringify(profile));

        dispatch({
            type:_SUCCESS,
            payload:accessToken
        })

        dispatch({
            type:_PROFILE,
            payload:profile
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:_FAILED,
            payload:err.message
        });
    }
}

export const Logout =()=> async dispatch =>{
    try {
        await auth.signOut();
        dispatch({
            type:_LOGOUT
        })
        sessionStorage.removeItem('app-user');
        sessionStorage.removeItem('app-accessToken');
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:_FAILED,
            payload:error.message
        });
    }
}