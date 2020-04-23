import React from 'react'
import image from '../images/images.jpeg'
import axios from 'axios'
// import queryString from 'query-string'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import util from '../lib/util'


class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: ''
    }
  }




  getProfile() {
    const id = this.props.match.params.id

    console.log('id' + id)
 

    const userId = (id && id !== 'mentorprofile') ? id : auth.getUserId()
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

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id ) {
      this.getProfile()
    }
  }


  render() {

    if (!this.state.profile) {
      return null
    }
    const id = this.props.match.params.id
    const userId = (id && id !== 'mentorprofile') ? id : auth.getUserId()
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
            
            <h2 dangerouslySetInnerHTML={util.createMarkup(profile.shortDescription)}>
            </h2>
            

            <div dangerouslySetInnerHTML={util.createMarkup(profile.fullDescription)}> 
            
            </div>
              
            
            
          </div>
          
        </div>
       
      </div>
        
    </div>
    
  }


}



export default UserProfile