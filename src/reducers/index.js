
import { combineReducers } from 'redux';

// import reducer
import { symbol } from './symbol.reducer';
import { checkFilterReady } from './checkFilterReady.reducer';

const rootReducer = combineReducers({
    symbol,
    checkFilterReady
});

export default rootReducer;
