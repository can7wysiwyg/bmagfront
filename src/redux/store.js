import { configureStore } from "@reduxjs/toolkit";
import { adminRdcr } from "./reducers/admin_Reducer";
import { publishRdcr } from "./reducers/publish_Reducer";
import { magRdcr } from "./reducers/magazine_Reducer";
import { publicRdcr } from "./reducers/public_Reducer";





export const store = configureStore({
    reducer: {
        adminRdcr,
        publishRdcr,
        magRdcr,
        publicRdcr
        
    

    },
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })

    }

})