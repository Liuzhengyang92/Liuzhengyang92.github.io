import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import heatmapReducer from './store/reducers/heatmap'

const rootReducer = combineReducers({
    heatmap: heatmapReducer,
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
