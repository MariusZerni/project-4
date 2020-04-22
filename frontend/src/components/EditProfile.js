import React from 'react'
import auth from '../lib/auth'
import axios from 'axios'


class EditProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      // data: {
      photo: null,
      shortDescription: '',
      fullDescription: ''
      // }
    }


  }


  componentDidMount() {
    this.getProfile()
  }

  getProfile() {
    const userId = auth.getUserId()
    console.log(userId)
    axios.get(`api/portal/mentorprofiles/${userId}`)
      .then((response) => {
        console.log(response.data)
        this.setState({ profile: response.data[0] })
      })
      .catch((error) => { 
        console.log(error)
      })
  }





  handleChange = (e) => {
    e.preventDefault()
    console.log({ [e.target.id]: e.target.value })
    this.setState({
      [e.target.id]: e.target.value
    }
    )
  }

  

  handleImageChange = (e) => {
    e.preventDefault()

    this.setState({
      photo: e.target.files[0]
    })
    
  }

  handleSubmit = (event) => {
    event.preventDefault()
    

    const formData = new FormData()

    // if (this.state.photo){
    //   formData.append('photo', this.state.photo)
    // }
    formData.append('shortDescription', this.state.shortDescription)
    formData.append('fullDescription', this.state.fullDescription)
    formData.append('user', auth.getUserId())

    const url = `api/portal/mentorprofiles/${this.state.profile.id}/`
  
    axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => 
        this.props.history.push('/mentorprofile'))
      .catch(err => console.error(err))
  } 


  // componentDidMount(
  //   this.handleSubmit()
  // )






  render() {
    console.log('state')
    console.log(this.state)
    return <section className="create-profile">
      <div className="container-create-profile">
        <form  
          
          className="profile-form" 
          encType='mutipart/form-data' 
          onSubmit={this.handleSubmit}>
          <p className="textarea-motto">
            <textarea   
              type="textarea" 
              placeholder='Motto' 
              id='shortDescription' 
              value={this.state.shortDescription} 
              onChange={this.handleChange} 
              required />
          </p>
          <p className="textarea-description" >
            <textarea  
              type="textarea" 
              placeholder='Description' 
              id='fullDescription' 
              value={this.state.fullDescription} 
              onChange={this.handleChange} />

          </p>
          <p className="input-create-profile"  >
            <input type="file"
              id="photo"
              accept="image/png, image/jpeg"  
              onChange={this.handleImageChange} />
          </p>
          <input  
            className="input-create-profile"  
            type="submit"/>
        </form>
      </div>
    </section>
  }
}


export default EditProfile