import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

import registerServiceWorker from './registerServiceWorker';

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//console.log(logger)

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    ))

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, 
//     document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}
        ><BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
    
registerServiceWorker();
