import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app';
import Users from './components/users/users';
import Home from './components/home/home';

const AppRouter = () => {
    return(
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Home} />
                <Route path="/users" component={Users} />
            </Route>
        </Router>
    )
}

export default AppRouter;
