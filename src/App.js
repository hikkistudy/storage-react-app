import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Storage from "./Storage";
import {AuthProvider} from './Auth';
import LoginPage from './Login';
import {PrivateRoute} from './PrivateRoute';
import {Navbar, Nav, Button} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    state = {
        isLogin: false
    };

    logout = () => {
        localStorage.removeItem('curUser');
        window.location.reload();
    };

    updateLog = status => {
        this.setState({isLogin: status});
    };

    render() {
        return (
            <AuthProvider className="container-fluid align-items-center" value={{auth: this.updateLog}}>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand>Storage</Navbar.Brand>
                    <Nav>
                        { this.state.isLogin ?
                            <Button variant="outline-info" onClick={this.logout}>Log Out</Button>
                            : ''
                        }
                    </Nav>
                </Navbar>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <PrivateRoute path="/" component={Storage}/>
                    <Redirect to="/"/>
                </Switch>
            </AuthProvider>
        );
    }
}

export default App;
