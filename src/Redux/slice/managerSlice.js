import {createSlice} from '@reduxjs/toolkit'

const managerSlice = createSlice({
    name : 'manager',
    initialState : {
        token : "",
        manager : null
  
    },
    reducers : {
        setManagerDetails:(state,action)=>{
            state.token = action.payload.token;
            state.manager = action.payload.manager;
 
        },
        logoutManager:(state)=>{
            state.token = ''
            state.manager = ''
             
        }
    }

})

export const {setManagerDetails,logoutManager} = managerSlice.actions

export default managerSlice.reducer