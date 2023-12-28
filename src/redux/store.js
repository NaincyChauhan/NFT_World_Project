// redux/store.js
// import { createStore } from 'redux';
import { legacy_createStore as createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import the function
import { NFTWorld, provider } from './reducers';

const reducers = combineReducers({
    NFTWorld, 
    provider
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducers,
    // composeWithDevTools() // Enhance the store with DevTools
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
