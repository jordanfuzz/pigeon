import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Create from './components/Create/Create'
import Cart from './components/Create/Cart/Cart'



export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create" component={Create} />
    <Route path="/cart" component={Cart} />
  </Switch>
)