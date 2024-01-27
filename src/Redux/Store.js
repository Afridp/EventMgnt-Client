
import {combineReducers, configureStore,  } from '@reduxjs/toolkit'
import {persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
// 
import storage from 'redux-persist/lib/storage'
import managerSlice from './slice/managerSlice'
import customerSlice from './slice/customerSlice'


// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
//   });
  
// configuring the storae space of data when persistance
const persistConfig = {
    key : 'root',
    storage
}

const reducer = combineReducers({
    customerSlice,
    managerSlice
})

// making a persistance data including some logic for persistance with config and slice,its only creating a data for persistance,its only stored in storage as persistance in susequent steps
const persisted = persistReducer(persistConfig,reducer)

// creating store
const store = configureStore({
    reducer : persisted,
    middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : [FLUSH, REHYDRATE, PAUSE,PERSIST,PURGE,REGISTER],
        },
    })
// setting the state as persisted value,so it will ensure that if we trying to update it will perisist with new value and showing the persisted to dom 
    // middleware : customizedMiddleware
})

const persistor = persistStore(store)

export {store , persistor}      