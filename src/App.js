import React, {Component} from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';
// import {Login} from "./Login";
import Storage from "./Storage/index";
import {AuthProvider} from './Auth';
import LoginPage from './Login/login';
import {PrivateRoute} from './PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <AuthProvider className="container-fluid align-items-center">
                <Switch>
                    <Route path="/" component={LoginPage}>
                        {/*<LoginPage />*/}
                    </Route>
                    <PrivateRoute path="/protected">
                        <h1>Hello?</h1>
                        <Storage />
                    </PrivateRoute>
                    <Redirect to="/"/>
                </Switch>
            </AuthProvider>
        );
    }
}

export default App;
