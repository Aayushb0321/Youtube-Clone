import { SEARCH_ELEMENT_FAILED, SEARCH_ELEMENT_REQUEST, SEARCH_ELEMENT_SUCCESS } from "../videoActions.js";

export const searchReducer=(
    prevState={
        searchResults:[],
        loading:false,
        error:'',
        noError:true,
        nextPageToken:null
    },action)=>{
        const {type,payload}=action;

        switch(type){
            case SEARCH_ELEMENT_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case SEARCH_ELEMENT_SUCCESS:
                return{
                    ...prevState,
                    loading:false,
                    searchResults:[...prevState.searchResults,...payload.searchResults],
                    query:payload.query,
                    nextPageToken:payload.nextPageToken,
                    error:'',
                    noError:true
                }
            case SEARCH_ELEMENT_FAILED:
                return{
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            case 'SEARCH_ELEMENT_RESET':
                return{
                    ...prevState,
                    searchResults:[],
                    loading:false,
                    error:'',
                    noError:true,
                    query:'',
                    nextPageToken:null
                }
            default:
                return prevState;
        }
}