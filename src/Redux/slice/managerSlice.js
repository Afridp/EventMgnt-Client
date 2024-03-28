import { createSlice } from '@reduxjs/toolkit'

const managerSlice = createSlice({
    name: 'manager',
    initialState: {
        token: "",
        manager: null,
        domainName: ""

    },
    reducers: {
        setManagerDetails: (state, action) => {
            state.token = action.payload.token;
            state.manager = action.payload.manager;

        },
        setDomainName: (state, action) => {
            state.domainName = action.payload.domainName
        },
        logoutManager: (state) => {
            state.token = ''
            state.manager = ''

        }
    }

})

export const { setManagerDetails,setDomainName, logoutManager } = managerSlice.actions

export default managerSlice.reducer