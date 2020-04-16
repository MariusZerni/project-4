import React from 'react'
// import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../src/styles/sidebar.scss'
import '../src/styles/styles.scss'
// import '../src/styles/style.css'


import Home from '../src/components/Home'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
      
      
    </Switch>
  </BrowserRouter>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)