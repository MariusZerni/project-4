import React from 'react'
// import queryString from 'query-string'
import axios from 'axios'
import auth from '../lib/auth'


class CreateProfileForm extends React.Component {
  constructor() {
    super()
    this.state = {
      // createProfile: '',
      photo: null,
      shortDescription: '',
      fullDescription: ''
    }
  }


  

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    }
    )
  }

  

  handleImageChange =(e) => {
    e.preventDefault()

    this.setState({
      photo: e.target.files[0]
    })
    
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    if (this.state.photo){
      formData.append('photo', this.state.photo)
    }
    formData.append('shortDescription', this.state.shortDescription)
    formData.append('fullDescription', this.state.fullDescription)
    formData.append('user', auth.getUserId())

    const url = 'api/portal/mentorprofiles'
   
    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => console.log(res))
      .catch(err => console.error(err))
    
  }
    
    
  




  render() {
    


    return <section className="create-profile">
      <div className="container-create-profile">
        <form  className="profile-form" encType='mutipart/form-data' onSubmit={this.handleSubmit}>
          <p className="textarea-motto">
            <textarea   type="textarea" placeholder='Motto' id='shortDescription' value={this.state.shortDescription} onChange={this.handleChange} required/>
          </p>
          <p className="textarea-description" >
            <textarea  type="textarea" placeholder='Description' id='fullDescription' value={this.state.fullDescription} onChange={this.handleChange} required/>

          </p>
          <p className="input-create-profile"  >
            <input type="file"
              id="photo"
              accept="image/png, image/jpeg"  onChange={this.handleImageChange} />
          </p>
          <input  className="input-create-profile"  type="submit"/>
        </form>
      </div>
    </section>
  
  }
}  
    



export default CreateProfileForm