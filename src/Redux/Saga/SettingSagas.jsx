import { put, takeEvery } from "redux-saga/effects";
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("setting", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("setting")
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("setting", action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_SETTING_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("Setting", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}

export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)            //Watcher Saga
    yield takeEvery(GET_SETTING, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_SETTING, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_SETTING, deleteSaga)            //Watcher Saga
}