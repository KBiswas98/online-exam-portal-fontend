/*********************
 ***  With persist ***
 *********************/
import React from "react";
import { createStore, applyMiddleware } from "redux";
import AllReducers from "../reducers";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigation from "../../navigation/Navigation";

const pConfig = {
    key: "root",
    storage,
    whitelist: "AuthReducers",
};

const pReducer = persistReducer(pConfig, AllReducers);
const store = createStore(
    pReducer,
    applyMiddleware(promise, createLogger({ collapsed: true }))
);
const pStore = persistStore(store);

export default function Store() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={pStore}>
                <AppNavigation />
            </PersistGate>
        </Provider>
    );
}
