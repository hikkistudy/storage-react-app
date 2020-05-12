import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

const {Provider, Consumer: AuthConsumer} = React.createContext({
    isAuthorized: false
});

class AuthProvider extends Component {
    state = {
        isAuthorized: false
    };

    authorize = (apiResp) => {
        this.setState({isAuthorized: apiResp}, () => {
            this.props.history.push("/");
            this.props.value.auth(true);
        });
    };

    checkCurrentUser = () => {
        if (localStorage.getItem('curUser')) {
            this.authorize(true);
        }
    };

    componentDidMount() {
        this.checkCurrentUser();
    }

    render() {
        const {isAuthorized} = this.state;

        return (
            <Provider value={{isAuthorized, authorize: this.authorize}}>
                {this.props.children}
            </Provider>
        )
    }
}

export function withAuth(WrappedComponent) {
    return class AuthHOC extends Component {
        render() {
            return (
                <AuthConsumer>
                    {contextProps => (
                        <WrappedComponent {...contextProps} {...this.props}/>
                    )}
                </AuthConsumer>
            )
        }
    }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter as AuthProvider }
