import React from 'react'
// import queryString from 'query-string'
import axios from 'axios'
import auth from '../lib/auth'


class RegisterMentorForm extends React.Component {
  constructor() {
    super()
    this.state = {
      mentorProfile: '',
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
    
    // console.log(e.target.files[0])

    // const form = new FormData()
    // form.append('photo', e.target.files[0])
    // form.append('shortDescription', this.state.shortDescription)
    // form.append('fullDescription', this.state.fullDescription)
    // form.append('user', 1)

    // console.log(form)
    // })
    // this.setState({ test: form })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(this)
    // console.log(this.state)
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
    
    
    // if (this.state.photo){
    //   formData.append('photo', this.state.photo)
    // }
    // formData.append('shortDescription', this.state.shortDescription)
    // formData.append('fullDescription', this.state.longDescription)
    // formData.append('user', 2)
    // const url = 'api/portal/mentorprofiles'
    // console.log(formData)

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    // axios.post(url, formData, {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // })
    //   .then(res => {
    //     console.log('res')
    //     console.log(res.data)
    //   })
    //   .catch(err => console.log(err))
  




  render() {
    

    //console.log(this.state.test)

    return <div>
      <form encType='mutipart/form-data' onSubmit={this.handleSubmit}>
        <p>
          <input type="text" placeholder='shortDescription' id='shortDescription' value={this.state.shortDescription} onChange={this.handleChange} required/>
        </p>
        <p>
          <input type="text" placeholder='fullDescription' id='fullDescription' value={this.state.fullDescription} onChange={this.handleChange} required/>

        </p>
        <p>
          <input type="file"
            id="photo"
            accept="image/png, image/jpeg"  onChange={this.handleImageChange} />
        </p>
        <input type="submit"/>
      </form>
    </div>
  
  }
}  
    
    
    //<div className="App">
    //   <form onSubmit={this.handleSubmit}>
    //     <p>
    //       <input type="text" placeholder='Motto' name='shortDescription' value={this.state.title} onChange={this.handleChange} required/>
    //     </p>
    //     <p>
    //       <input type="text" placeholder='Description' name='longDescription' value={this.state.title} onChange={this.handleChange} required/>
    //     </p>
    //     <p>
    //       <input type="file"
    //         id="image"
    //         accept="image/png, image/jpeg"  name="photo" onChange={this.handleProfileChange} required/>
    //     </p>
    //     <input type="submit" onClick={(e) => this.handleClick(e)} />
    //   </form>
    // </div>

  










// class RegisterMentorForm extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//             data: {
//               mentorProfile: '',
//             image: null,
//             shortDescription: '',
//             longDescription: ''
//             }
//       }
//     }
  
//   handleSubmit(event) {
//     event.preventDefault()
//     axios.post('api/portal/mentorprofiles', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
//       .then(res => {
//         console.log(res)
//         this.props.history.push('/')
//       })
//       .catch(err => console.log(err))
//   }

//   handleImageChange(image) {
//     const formData = new FormData()
//     formData.append('photo', this.image.target, this.image.target.name)
        
//         formData.append('shortDescription', this.state.shortDescription)
//         formData.append('fullDescription', this.state.longDescription)
//         formData.append('user', 2)
//     const data = { ...this.state.data, image: formData }
//     this.setState({ data })
//   }


//   render() {
//     return <form
//       className="form"
//       onSubmit={(event) => this.handleSubmit(event)}
//       encType='mutipart/form-data'
//     >
//       <p>
//         <input type="text" placeholder='Motto' name='shortDescription' value={this.state.title} onChange={this.handleChange} required/>
//       </p>
//       <p>
//         <input type="text" placeholder='Description' name='longDescription' value={this.state.title} onChange={this.handleChange} required/>
//       </p>
//       <p></p>
//       <input type="file"
//         id="image"
//         accept="image/png, image/jpeg" onChange={(image) => this.handleImageChange(image)} />
//       <button className="button is-success">
//         Upload Image
//       </button>
//     </form>
//   }
// }


export default RegisterMentorForm