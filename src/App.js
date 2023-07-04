import User from './User/User';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Admin from './Admin/Admin';
import React from 'react';
import UserTakeout from './User/UserTakeout/UserTakeout';
import AdminOrders from './Admin/AdminOrders/AdminOrders';



function App() {
  return (
    <Switch>
        <Route path="/" exact component={User}></Route>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/admin/orders" exact component={AdminOrders}></Route>
        <Route path="/takeout" exact component={UserTakeout}></Route>
        <Redirect from='*' to={'/'}/>
    </Switch>
  )
}

export default App;