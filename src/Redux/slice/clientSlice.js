import {createSlice} from '@reduxjs/toolkit'

const clientSlice = createSlice({
    name : 'client',
    initialState : {
        token : "",
        client : null
        // image:"",
        // is_  admin:""
    },
    reducers : {
        setClientDetails:(state,action)=>{
            state.token = action.payload.token;
            state.manager = action.payload.client;
            // state.cmobile = action.payload.cmobile
            // state.cemail = action.payload.cemail;
            // state.image = action.payload.image;
        },
        logoutClient:(state)=>{
            state.token = ''
            state.client = ''
            // state.cmobile = ''
            // state.cemail = ''
            // state.image = ''    
        }
    }

})

export const {setClientDetails,logoutClient} = clientSlice.actions

export default clientSlice.reducer