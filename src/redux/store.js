import { configureStore } from "@reduxjs/toolkit";
import { adminRdcr } from "./reducers/admin_Reducer";
import { publishRdcr } from "./reducers/publish_Reducer";
import { magRdcr } from "./reducers/magazine_Reducer";
import { publicRdcr } from "./reducers/public_Reducer";
import { subRdcr } from "./reducers/subscription_Reducer";
import { vidSubRdcr } from "./reducers/videoSubscribe_Reducer";
import { soccerRdcr } from "./reducers/soccer_Reducer";



export const store = configureStore({
    reducer: {
        adminRdcr,
        publishRdcr,
        magRdcr,
        publicRdcr,
        subRdcr,
        vidSubRdcr,
        soccerRdcr
        
    

    },
    middleware:  (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })

    }

})