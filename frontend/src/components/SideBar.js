import React from 'react'
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="menu-wrap">
        <input type="checkbox" className="toggler"></input>
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              <ul>
                <li>
                  <Link className='link' to="/">Home</Link>
                </li>
                <li>
                  <Link className='link' to="mentors">Mentors</Link>
                </li>
                <li>
                  <Link className='link' to="register-login">Register</Link>
                </li>
                <li>
                  <Link className='link' to="register-login">Log In</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default SideBar
