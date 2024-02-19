import {createSlice} from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name : 'employee',
    initialState : {
        token : "",
        employee : null

    },
    reducers : {
        setEmployeeDetails:(state,action)=>{
            state.token = action.payload.token;
            state.employee = action.payload.employee;

        },
        logoutEmployee:(state)=>{
            state.token = ''
            state.employee = ''
        
        }
    }

})

export const {setEmployeeDetails,logoutEmployee} = employeeSlice.actions

export default employeeSlice.reducer