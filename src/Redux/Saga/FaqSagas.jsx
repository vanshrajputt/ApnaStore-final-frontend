import { put, takeEvery } from "redux-saga/effects";
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("faq", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_FAQ_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}

export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)            //Watcher Saga
    yield takeEvery(GET_FAQ, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_FAQ, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_FAQ, deleteSaga)            //Watcher Saga
}