import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from "./redux/reducer/rootReducer"
import thunk from 'redux-thunk'

const initialState = {}
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
)

export default store
