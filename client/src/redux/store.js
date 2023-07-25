
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //thunk para operaciones asincronas
////import {composeWithDevTools} from 'redux-devtools-extension' ; //extension del chrome o firefox
import reducer from "./reducer"

//const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = createStore(  reducer, /* preloadedState, */  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(reducer, applyMiddleware(thunk));


export default store;