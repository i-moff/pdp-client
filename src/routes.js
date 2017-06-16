import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import NotFoundPage from './components/not-found-page';

// import HomePage from './components/home-page';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/require-auth';

export default (
    <Route path="/" component={App}>
        {/*<IndexRoute component={HomePage}/>*/}
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
        <Route path="dashboard" component={RequireAuth(Dashboard)}/>


        <Route path="*" component={NotFoundPage}/>
    </Route>
);