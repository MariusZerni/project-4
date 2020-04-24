import React from 'react'
import auth from '../lib/auth'
import axios from 'axios'


class EditProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      profile: {},
      photo: null,
      shortDescription: '',
      fullDescription: ''
    }
  }


  componentDidMount() {
    this.getProfile()
  }


  getProfile() {
    const userId = auth.getUserId()
    axios.get(`api/portal/mentorprofiles/${userId}`)
      .then((response) => {
        const profile = response.data[0] 
        this.setState({ profile })
        this.setState({ shortDescription: profile.shortDescription })
        this.setState({ fullDescription: profile.fullDescription })
      })
      .catch((error) => { 
        console.log(error)
      })
  }



  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
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
    formData.append('shortDescription', this.state.shortDescription)
    formData.append('fullDescription', this.state.fullDescription)
    formData.append('user', auth.getUserId())
    const url = `api/portal/mentorprofiles/${this.state.profile.id}/`
    axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        this.props.history.push('/userprofile')
      })
      .catch(err => console.error(err))
  } 



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