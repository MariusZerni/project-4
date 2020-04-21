import React from 'react'
// import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import '../src/styles/sidebar.scss'
import '../src/styles/styles.scss'
import '../src/styles/register.scss'


import Home from '../src/components/Home'
import Register from '../src/components/Register'
import Mentors from '../src/components/Mentors'
import GetHelp from '../src/components/GetHelp'
import SideBar from '../src/components/SideBar'
import ReplyToThread from '../src/components/ReplyToThread'
import MentorProfile from '../src/components/MentorProfile'
import RegisterMentorForm from '../src/components/RegisterMentorForm'
// import SideBar from '../src/components/SideBar'

const App = () => {
  
  return <HashRouter>
    <SideBar />
    <Switch>
      
      <Route exact path="/" component={Home} />
      <Route path="/mentors" component={Mentors} />
      <Route exact path="/gethelp" component={GetHelp} />
      <Route exact path="/thread" component={ReplyToThread} />
      <Route exact path="/mentorprofile" component={MentorProfile} />
      <Route exact path="/profile" component={RegisterMentorForm} />
      <Route path="/register-login" component={Register} />
      
      
      
    </Switch>
    
  </HashRouter>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)