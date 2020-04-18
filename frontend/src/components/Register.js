import React from 'react'
import axios from 'axios'
import auth from '../lib/auth.js'
import queryString from 'query-string'


class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      register: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      logIn: {
        name: '',
        password: ''
      },
      errors: {},
      isRegistered: false,
      isLoginActive: true
    }
  }

  handleChangeRegister(event) {
    const { name, value } = event.target
    const register = { ...this.state.register, [name]: value }
    this.setState({ register })
  }

  handleChangeLogIn(event) {
    const { name, value } = event.target
    const logIn = { ...this.state.logIn, [name]: value }
    this.setState({ logIn })
  }


  handleSubmitRegister(event) {
    // console.log('register')
    // console.log(this.state)
    event.preventDefault()
    axios
      .post('/api/register', this.state.register)
      .then( () => this.setState({ isLoginActive: !this.state.isLoginActive }))
      .catch(err => { 
        // console.log('error')
        // console.log(err.response.data)
        this.setState({ errors: err.response.data })
      })
  }

  handleSubmitLogIn(event) {
    // console.log(this.state.login)
    event.preventDefault()
    axios
      .post('/api/login', this.state.logIn)
      .then(res => {
        const token = res.data.token
        auth.setToken(token)
        this.props.history.push('/mentors')
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({ errors: err.response.data })
      })
  }





  handleClick(e) {
    e.preventDefault()
    this.setState({ isLoginActive: !this.state.isLoginActive, errors: {} })
  }

  componentDidMount(){
    const params = queryString.parse(this.props.location.search)
    // console.log(params.current)
    this.setState({ isLoginActive: params.current === 'register' ? false : true })
  }

  render() {
    const { errors } = this.state
    console.log('errors')
    console.log(errors.email)
    const { isLoginActive } = this.state
    return <div className="body">
      <div className={`container ${!isLoginActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={event => this.handleSubmitRegister(event)}>
            <h1>Create Account</h1>
            <input onChange={event => this.handleChangeRegister(event)}
              type="text" name="first_name" placeholder="Name" />
            {errors.first_name && (
              <small className="error-message-m">
                {errors.first_name}
              </small>)}
            <input onChange={event => this.handleChangeRegister(event)}
              type="text" name="username" placeholder="Username" />
            {errors.username && (
              <small className="error-message-m">
                {errors.username[0]}
              </small>)}
            <input onChange={event => this.handleChangeRegister(event)}
              type="email" name="email" placeholder="Email" />
            {errors.email && (
              <small className="error-message-m">
                {errors.email[0]}
              </small>)}
            <input onChange={event => this.handleChangeRegister(event)}
              type="password" name="password" placeholder="Password" />
            {errors.password && (
              <small className="error-message-m">
                {errors.password[0]}
              </small>)}
            <input onChange={event => this.handleChangeRegister(event)}
              type="password" name="password_confirmation" placeholder="Password Confirmation" />
            {errors.password_confirmation && (
              <small className="error-message-m">
                {errors.password_confirmation[0]}
              </small>)}
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={event => this.handleSubmitLogIn(event)}>
            <h1 >Sign in</h1>
            <input onChange={event => this.handleChangeLogIn(event)}
              type="email" name="email" placeholder="Email" />
            {/* {errors.email && (
              <small className="error-message-m">
                {errors.email}
              </small>)} */}
            <input onChange={event => this.handleChangeLogIn(event)}
              type="password" name="password" placeholder="Password" />
            {errors.message && (
              <small className="error-message-m">
                {errors.message}
              </small>)}
            <a href="#">Forgot your password?</a>
            <button  >Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" name="login" onClick={(e) => this.handleClick(e)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" name="register" onClick={(e) => this.handleClick(e)}   >Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  }


}


export default Register