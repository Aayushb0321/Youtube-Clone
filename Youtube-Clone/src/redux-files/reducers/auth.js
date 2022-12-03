import { _FAILED, _LOGOUT, _PROFILE, _REQUEST, _SUCCESS } from "../authActions.js";

export const authReducer = (
    prevState={
        accessToken:sessionStorage.getItem('app-accessToken')?sessionStorage.getItem('app-accessToken'):null,
        user:sessionStorage.getItem('app-user')?JSON.parse(sessionStorage.getItem('app-user')):null,
        loading:false,
        noError:true,
        error:''
    },action)=>{

    const {type,payload}=action;
    switch(type){
        case _REQUEST:
            return {
                ...prevState,
                loading:true,
                noError:true,
                error:''
            }
        case _LOGOUT:
            return {
                ...prevState,
                accessToken:null,
                user:null,
                noError:true,
                error:''
            }
        case _SUCCESS:
            return {
                ...prevState,
                accessToken:payload,
                loading:false,
                error:"",
                noError:true
            }
        case _FAILED:
            return{
                ...prevState,
                accessToken:null,
                loading:false,
                error:payload._FAILED,
                noError:false
            }
        case _PROFILE:
            return{
                ...prevState,
                user:payload,
                error:'',
                noError:true
            }
        default:
            return prevState
    }
}