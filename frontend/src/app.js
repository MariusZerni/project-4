import React from 'react'
// import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../src/styles/sidebar.scss'
import '../src/styles/styles.scss'
import '../src/styles/register.scss'


import Home from '../src/components/Home'
import Register from '../src/components/Register'
import Mentors from '../src/components/Mentors'
import GetHelp from '../src/components/GetHelp'
import SideBar from '../src/components/SideBar'
import Threads from '../src/components/Threads'
// import SideBar from '../src/components/SideBar'

const App = () => {
  
  return <BrowserRouter>
    <SideBar />
    <Switch>
      
      <Route exact path="/" component={Home} />
      <Route path="/mentors" component={Mentors} />
      <Route exact path="/gethelp" component={GetHelp} />
      <Route exact path="/treads" component={Threads} />
      <Route path="/register-login" component={Register} />
      
      
      
    </Switch>
    
  </BrowserRouter>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)