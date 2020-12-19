import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import PrivateRouting from './PrivateRouting';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import ComposeMessage from '../dashboard/ComposeMessage';

const Routes = props => {
    return (
        <section className='container'>
        <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRouting exact  path='/dashboard' component={Dashboard}/>
            <PrivateRouting exact  path='/compose-message' component={ComposeMessage}/>
          </Switch>
        </section>

    )
}

export default Routes
