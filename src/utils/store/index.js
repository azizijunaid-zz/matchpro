import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import * as reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);

export const store = createStoreWithMiddleware(reducer);
