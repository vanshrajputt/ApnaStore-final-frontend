import { put, takeEvery } from "redux-saga/effects";
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("feature", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)            //Watcher Saga
    yield takeEvery(GET_FEATURE, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)            //Watcher Saga
}