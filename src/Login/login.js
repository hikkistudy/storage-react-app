import React from 'react';
import {Redirect} from 'react-router-dom';
import {withAuth} from '../Auth';

export default withAuth(({isAuthorized, authorize}) => (
    isAuthorized ? (<Redirect to="/protected"/>) :
        (
            <div className="container-fluid align-items-center">
                <h1>Авторизация</h1>

                <button onClick={authorize}>click</button>
            </div>
        )
));
