import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeOfPassword = event => {
    this.setState({password: event.target.value})
  }

  storeJwtToken = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userCredentials = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    console.log(loginUrl, userCredentials)
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.storeJwtToken(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-card">
        <img
          src="https://res.cloudinary.com/duws9fktk/image/upload/v1687154076/Mini-Project/Login-page/Rectangle_1467_tiejwb.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-el" onSubmit={this.onLoginForm}>
          <img
            src="https://res.cloudinary.com/duws9fktk/image/upload/v1687154074/Mini-Project/Login-page/Group_7731_gx5isg.png"
            className="web-logo"
            alt="login website logo"
          />
          <label htmlFor="user-id" className="user-name-label">
            Username*
          </label>
          <input
            type="text"
            id="user-id"
            className="user-input"
            value={username}
            onChange={this.onChangeUsername}
            required
          />
          <label htmlFor="password-id" className="user-password-label">
            Password*
          </label>
          <input
            type="password"
            id="password-id"
            className="password-input"
            value={password}
            onChange={this.onChangeOfPassword}
            required
          />
          {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
