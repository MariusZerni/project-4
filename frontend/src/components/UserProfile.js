import React from 'react'
import image from '../images/images.jpeg'
import axios from 'axios'
// import queryString from 'query-string'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'


class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: ''
    }
  }




  getProfile() {
    const userId = auth.getUserId()
    console.log(userId)
    axios.get(`api/portal/mentorprofiles/${userId}`)
      .then((response) => {
        console.log(response.data)
        this.setState({ profile: response.data })
      })
      .catch((error) => { 
        console.log(error)
      })
  }


  componentDidMount() {
    this.getProfile()
  }


  render() {

    if (!this.state.profile) {
      return null
    }
    const userId = auth.getUserId()
    const profile = this.state.profile[0]
    console.log(this.state.profile[0].shortDescription)
    return <div id="container-mentor-profile"  >
      <div className="img-background"  style={{ backgroundImage: `url(${image})` }}></div>
      <div className="opacity">
        <div id="content-mentor-profile">
          <div className="edit-profile"> <Link to={`/mentorprofile/${userId}/edit`}>Edit</Link> </div>
          <div className="left-container">
            <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000' + (profile.photo) })` }} >Photo</div>
            <div className="votes"></div>
          </div>

          <div className="right-content">
            
            <h3>{profile.shortDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ratione.</h3>
            

            <p>{profile.fullDescription} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum sunt quaerat eum quia modi corrupti eveniet esse accusantium nobis dolor.
              <br/>               
            
            </p>
              
            
            
          </div>
          
        </div>
       
      </div>
        
    </div>
    
  }


}



export default UserProfile