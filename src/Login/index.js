import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {withAuth} from '../Auth';
import axios from "axios";

class Login extends Component {
    state = {
        user: {
            email: '',
            password: '',
        },
        currentUser: localStorage.getItem('curUser') || '',
        apiResponse: '',
        msg: ''
    };

    handleChange = event => {
        this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value} });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.callAPI(this.state.user);
        this.setState({ user: { ...this.state.user, email: '', password: ''} });
    };

    callAPI = user => {
        axios.post("http://localhost:3001/api/users/login", {"user": user})
            .then(data => {
                console.log(data.data);
                if (this.state.currentUser === '') {
                    localStorage.setItem('curUser', data.data.user.token);
                    localStorage.setItem('category', data.data.user.category);
                }

                this.props.autorizeParent(true);
            })
            .catch(error => {
                console.log("Server responded >> ", error);
            });
    };

    render() {
        return (
            <div className="container-fluid align-items-center">
                <h1>Authorization</h1>
                <form className="needs-validation" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="mail">E-mail</label>
                        <input id="email"
                               name="email"
                               value={this.state.user.email}
                               onChange={this.handleChange}
                               className="form-control"
                               type="email"
                               autoComplete="off"
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password"
                               name="password"
                               value={this.state.user.password}
                               onChange={this.handleChange}
                               className="form-control" type="password"
                               required/>
                    </div>
                    <button className="btn btn-primary" type="submit">Log in</button>
                </form>
            </div>
        )
    }
}

export default withAuth(({isAuthorized, authorize}) => (
    isAuthorized ? (<Redirect to="/"/>) : (
        <Login autorizeParent={authorize}/>
    )
));
