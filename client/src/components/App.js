// This component handles the App template used on every page.
// import React, {PropTypes} from 'react';
import React from 'react';
//import { Switch, Route } from 'react-router-dom';
import { Router, Route } from 'react-router-dom';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import MessageBoard from './chatroom/ManageMessageBoard';
import history from '../history';

const App = () => (
    <main>
        <Router history={history}>
            <div>
                <Route exact path='/' component={SignIn}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/messageboard' component={MessageBoard}/>
            </div>
        </Router>
    </main>
)

export default App;