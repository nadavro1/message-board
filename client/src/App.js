import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';
import {load_user} from './actions/auth';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './components/routing/Routes';

const App= ()=>  {
  
  useEffect(() => {
    store.dispatch(load_user());
 },[]);

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route component = {Routes}/>
        </Switch>
      </Fragment> 
    </Router>
  </Provider>
)};
    
  

export default App;
