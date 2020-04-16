import React from 'react'
import { Link } from 'react-router-dom'


import SideBar from '../components/SideBar'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (<>
      <div className="home-container">
        <SideBar />
        <div className="login-logout-register">
          <div className="home-links"><Link className="link" to="register">Register</Link></div>
          <div className="home-links"><Link className="link" to="login">Log In</Link></div>
          <div className="home-links"><Link className="link" to="logout">Log Out</Link></div>
        </div>
        <div className="home-content color">
          <div className="brief-description">
            <h2>Brief description <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Non aspernatur iusto nesciunt est reprehenderit? 
              Quod explicabo aut officiis provident quas quo pariatur odit reprehenderit tenetur, 
              quidem earum soluta fugit tempora sequi rem, culpa iusto alias!</p>
          </div>
          
        </div>
       
        
      </div>
       <div className="home-content">
         <div className="how-it-works">
           <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, iste?</h2>
           <div className="columns">
             <div className="column-one">
               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, eveniet.</p>
             </div>
             <div className="column-two">
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ut.</p>
             </div>
           </div>
         </div>
       </div>
     </>
    )
  }
}

export default Home
