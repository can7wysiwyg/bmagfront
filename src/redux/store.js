import { configureStore } from "@reduxjs/toolkit";
import { adminRdcr } from "./reducers/admin_Reducer";



export const store = configureStore({
    reducer: {
        adminRdcr,
        
    

    },
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })

    }

})