import {createSlice} from '@reduxjs/toolkit'

const customerSlice = createSlice({
    name : 'customer',
    initialState : {
        token : "",
        customer : null

    },
    reducers : {
        setCustomerDetails:(state,action)=>{
            state.token = action.payload.token;
            state.customer = action.payload.customer;

        },
        logoutCustomer:(state)=>{
            state.token = ''
            state.customer = ''
        
        }
    }

})

export const {setCustomerDetails,logoutCustomer} = customerSlice.actions

export default customerSlice.reducer