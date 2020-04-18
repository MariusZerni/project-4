import React from 'react'
import { Link } from 'react-router-dom'


import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

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
          <div className="home-links"><Link className="link" to="/register-login?current=register">Register</Link></div>
          <div className="home-links"><Link className="link" to="/register-login?current=login">Log In</Link></div>
          <div className="home-links"><Link className="link" to="/">Log Out</Link></div>
        </div>
        <div className="home-content color-one">
          <div className="brief-description">
            <h2>Brief description <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Non aspernatur iusto nesciunt est reprehenderit? 
              Quod explicabo aut officiis provident quas quo pariatur odit reprehenderit tenetur, 
              quidem earum soluta fugit tempora sequi rem, culpa iusto alias!</p>
          </div>
          
        </div>
       
        
      </div>
       <div className="home-content color-two">
         <div className="how-it-works">
           <h2>How it Works <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, iste?</h2>
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

       <div id="home-content" className="color-three">
         <h2>Top Rated</h2>
         <section className="section">
           <div className="mentor-container">
             <div className="photo-rated">
               <div className="photo">Photo</div>
               <div className="rated">Top Rated</div>
             </div>
             <figure className="effect-marley">
               <h4 id="h2">Sweet Marley</h4>
               <p>Marley tried to convince her but she was not interested.</p>
             </figure>
           </div>
           <div className="mentor-container">
             <div className="photo-rated">
               <div className="photo">Photo</div>
               <div className="rated">Top Rated</div>
             </div>
             <figure className="effect-marley">
               <h4 id="h2">Sweet Marley</h4>
               <p>Marley tried to convince her but she was not interested.</p>
             </figure>
           </div>
           <div className="mentor-container">
             <div className="photo-rated">
               <div className="photo">Photo</div>
               <div className="rated">Top Rated</div>
             </div>
             <figure className="effect-marley">
               <h4 id="h2">Sweet Marley</h4>
               <p>Marley tried to convince her but she was not interested.</p>
             </figure>
           </div>
          
         </section>
         <section className="section">
           <div className="mentor-container">
             <div className="photo-rated">
               <div className="photo">photo</div>
               <div className="rated">top rated</div>
             </div>
             <figure className="effect-marley">
               <h4 id="h2">Sweet Marley</h4>
               <p>Marley tried to convince her but she was not interested.</p>
             </figure>
           </div>
           <div className="mentor-container">
             <div className="photo-rated">
               <div className="photo">photo</div>
               <div className="rated">top rated</div>
             </div>
             <figure className="effect-marley">
               <h4 id="h2">Sweet Marley</h4>
               <p>Marley tried to convince her but she was not interested.</p>
             </figure>
           </div>
         </section>
       </div>
       <Footer />
     </>
    )
  }
}

export default Home
