import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import promiseMiddleware from 'redux-promise';

export default createStore(reducers, applyMiddleware(promiseMiddleware));