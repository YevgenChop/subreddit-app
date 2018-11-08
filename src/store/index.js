import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const storeConfig = state => {
    return createStore(rootReducer, state, applyMiddleware(thunk));
};

export default storeConfig;
