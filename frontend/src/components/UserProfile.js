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


    axios.get(`api/portal/users/${userId}`)
      .then((response) => {
        console.log(response.data)
        this.setState({ mentor: response.data })
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

    if (!this.state.mentor) {
      return null
    }
 
    const id = this.props.match.params.id
    const userId = (id && id !== 'mentorprofile') ? id : auth.getUserId()
    
    return <div id="container-mentor-profile"  >
      <div className="img-background"  style={{ backgroundImage: `url(${image})` }}></div>
      <div className="opacity">
        <div id="content-mentor-profile">
          {userId === auth.getUserId() && 
          <div className="edit-profile"> <Link to={`/mentorprofile/${userId}/edit`}>Edit</Link> </div>
          }
          <div className="left-container">
            <div className="photo" style={{ backgroundImage: `url(${'http://localhost:4000' + (this.state.mentor.user_profile.photo) })` }} ></div>
            <div className="votes"></div>
          </div>

          <div className="right-content-user">
            <h3>{this.state.mentor.first_name}</h3>
            
            <h3 dangerouslySetInnerHTML={util.createMarkup(this.state.mentor.user_profile.shortDescription)}>
              
            </h3>
            

            <div dangerouslySetInnerHTML={util.createMarkup(this.state.mentor.user_profile.fullDescription)}> 
            
            </div>
              
            
            
          </div>
          
        </div>
       
      </div>
        
    </div>
    
  }


}



export default UserProfile