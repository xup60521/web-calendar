import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./datastore"

export default configureStore({
    reducer: {
        data: dataReducer
    }
});