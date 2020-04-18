import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      topRated: []
    }
  }


  fetchClients(clientIds) {
    clientIds.forEach((id) => {
      axios
        .get(`api/portal/clients/${id}`)
        .then(res => {
    

          this.setState({ topRated: [...this.state.topRated, res.data] })
        })
        .catch(error => console.error(error))
    })

  }



  fetchTopRated() {
    axios
      .get('api/portal/topvotes')
      .then(res => {

        const clientIds = res.data.map((elem) => {
          console.log(elem.from_mentor)
          return elem.from_mentor
        })

        this.fetchClients(clientIds)

        // console.log(clientIds)
      })
      .catch(error => console.error(error))
  }




  componentDidMount() {
    this.fetchTopRated()
  }
  





  render() {
    if (!this.state.topRated[0]) {
      return null
    }
    // console.log('cc')

    // const client = this.state.topRated[0]

    // if (client.mentor_profile){
    //   console.log(client.mentor_profile[0])
    // }
    console.log(this.state.topRated[0])
    const { topRated } = this.state
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
               <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000' + (topRated[0].mentor_profile[0].photo)})` }} heigth='150px' >
               </div>
               <div className="rated"></div>
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
