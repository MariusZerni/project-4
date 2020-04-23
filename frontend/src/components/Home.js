import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../lib/auth'


// import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      checkedProfile: false,
      topRated: []
    }
  }


  fetchUser() {
    const userId = auth.getUserId()
    console.log(userId)
    axios
      .get(`api/portal/users/${userId}`)
      .then((res) => {
        //this.setState({ mentors: res.data })
        console.log(res.data)

        const hasProfile = (res.data.user_profile) ? true : false

        auth.setHasProfile(hasProfile)
        console.log('hasProfile' + auth.getHasProfile())
        this.setState({ checkedProfile: true })
      })

      .catch((error) => console.error(error))
  }




  fetchTopRated() {
    axios
      .get('api/portal/topvotes')
      .then(res => {
        this.setState({ topRated: res.data })

        
      })
      .catch(error => console.error(error))
  }




  componentDidMount() {
    this.fetchTopRated()
    //this.fetchUser()
  }

  handleLogout() {
    auth.logout()
  }

  staticContent() {
    // if (!this.state.checkedProfile){
    //   return null
    // }

    const isLoggedIn = auth.isLoggedIn()
    return <>
    <div className="home-container">
      {/* <SideBar /> */}
      <div className="login-logout-register">
        
        <div className="home-links">
          <Link className="link" to="/profile">Create mentor profile</Link>
        </div>
        {!isLoggedIn && (
          <div className="home-links">
            <Link className="link" to="/register-login?current=register">Register</Link>
          </div>
        )}
        {!isLoggedIn && (
          <div className="home-links">
            <Link className="link" to="/register-login?current=login">Log In</Link>
          </div>
        )}
        {isLoggedIn && (
          <div className="home-links">
          
            <Link 
              onClick={() => this.handleLogout()}
              className="link" to="/">Log Out</Link>
          
          </div>
        )}
      </div>
      <div className="home-content color-one">
        <div className="brief-description">
          <h2>The Unlock Portal <br/> &quot;The Only Person You Are Destined <br/>To Become Is The Person You Decide To Be&quot; <br/> &quot;Ralph Waldo Emerson&quot;</h2>
          <p>Is a mentoring platform where you can find engaging stories about people who embarked on a journey to change their careers. Deciding to embrace a new career journey can be challenging but with the right support from people who have already overcome their fears this can be one step closer to fulfilling your dream. Get inspired by the stories shared here and join a community of people who have unlocked their potential. </p>
        </div>
        
      </div>
      
      
    </div>
       <div className="home-content color-two">
         <div className="how-it-works">
           <h2>How it Works</h2>
           <div className="columns">
             <div className="column-one">
               <p>For Mentors <br/> You need to register to have access to the platform. In order to share your story and become a mentor you need to create a profile with an inspiring story. <br/> Helping people to succeed and follow their dreams is a rewarding experience.    </p>
             </div>
             <div className="column-two">
               <p>For Users <br/> If you need support in changing your career you can create a profile and register with a mentor to get full access to their materials and personal advice.</p>
             </div>
           </div>
         </div>
       </div>
       
       </>
  }
  

  render() {
    // return null

    if (!this.state.topRated || this.state.topRated.length === 0) {
      return this.staticContent()
    }
   
    console.log(this.state.topRated)
    const { topRated } = this.state
    

    console.log(topRated)
    return (<>
     
      
      
     {this.staticContent()}
       <div id="home-content" className="color-three">
         <h2>Top Rated</h2>
         
         <section className="section">
           

           {topRated.map((element,i) => {

             return <div key={i} className="mentor-container">
               <div className="photo-rated">
                 <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000/media/' + (element.photo)})` }} heigth='150px' >
                 </div>
                 <div className="rated">Top Rated: {element.topVotes}</div>
               </div>
               <figure className="effect-marley">
                 <h4 id="h2">{element.name}h</h4>
                 <p>{element.shortDescription}</p>
               </figure>
             </div>
           })}
           
         </section>
         
       </div>
       <Footer />
     </>
    )
  }
}

export default Home
