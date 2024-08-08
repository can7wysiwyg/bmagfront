import { configureStore } from "@reduxjs/toolkit";
import { adminRdcr } from "./reducers/admin_Reducer";
import { publishRdcr } from "./reducers/publish_Reducer";
import { magRdcr } from "./reducers/magazine_Reducer";




export const store = configureStore({
    reducer: {
        adminRdcr,
        publishRdcr,
        magRdcr
        
    

    },
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })

    }

})