import { configureStore } from "@reduxjs/toolkit"
import CreateSagaMiddleware from "redux-saga"

import RootReducer from "./Reducers/RootReducer"
import RootSaga from "./Saga/RootSaga"

const saga = CreateSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [saga]
})

export default Store

saga.run(RootSaga)

