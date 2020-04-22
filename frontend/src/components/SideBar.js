import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'

class SideBar extends React.Component {
  constructor() {
    super()
    const isLoggedIn = auth.isLoggedIn()

    this.state = {
      loggedIn: isLoggedIn
    }
  }


  render() {
    const isLoggedIn = this.state.loggedIn
    console.log('Logged in' + isLoggedIn)
    return (
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" onClick={() => {
          const isLoggedIn = this.state.loggedIn
          this.setState({ loggedIn: isLoggedIn })
        }}>

        </input>
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
                  <Link className='link' to="gethelp">Get Help</Link>
                </li>
                <li><Link className='link' to="mentorprofile">My Profile</Link></li>
                {!isLoggedIn && (<li>
                  <Link className='link' to="register-login">Register</Link>
                </li>)}
                {!isLoggedIn && (<li>
                  <Link className='link' to="register-login">Log In</Link>
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default SideBar
