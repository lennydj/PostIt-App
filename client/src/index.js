import 'babel-polyfill';
import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import configureStore from './store/configureStore';
import App from './components/App';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const store = configureStore();

render (
    <Provider store={store}>
        <div>
            <BrowserRouter><App /></BrowserRouter>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar/>
        </div>
    </Provider>
, document.getElementById('app'));
