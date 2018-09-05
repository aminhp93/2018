import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
let middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// if (__DEV__) {
//     const reduxImmutableStateInvariant = require('redux-immutable-state-invariant')();
//     const createLogger = require('redux-logger');

//     const logger = createLogger({ collapsed: true });
//     middleware = [...middleware, reduxImmutableStateInvariant, logger];
// } else {
middleware = [...middleware];
// }

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    );
}
