import User from './User/User';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Admin from './Admin/Admin';
import React from 'react';
import AdminSettings from './Admin/AdminSettings/AdminSettings';


function App() {
  return (
    <Switch>
        <Route path="/" exact component={User}></Route>
        <Route path='/admin/settings' exact component={AdminSettings}></Route>
        <Route path="/admin" exact component={Admin}></Route>
        
        <Redirect from='*' to={'/'}/>
    </Switch>
  )
}

export default App;