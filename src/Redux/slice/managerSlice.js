import {createSlice} from '@reduxjs/toolkit'

const managerSlice = createSlice({
    name : 'manager',
    initialState : {
        token : "",
        manager : null
        // image:"",
        // is_  admin:""
    },
    reducers : {
        setManagerDetails:(state,action)=>{
            state.token = action.payload.token;
            state.manager = action.payload.manager;
            // state.cmobile = action.payload.cmobile
            // state.cemail = action.payload.cemail;
            // state.image = action.payload.image;
        },
        logoutManager:(state)=>{
            state.token = ''
            state.manager = ''
            // state.cmobile = ''
            // state.cemail = ''
            // state.image = ''    
        }
    }

})

export const {setManagerDetails,logoutManager} = managerSlice.actions

export default managerSlice.reducer