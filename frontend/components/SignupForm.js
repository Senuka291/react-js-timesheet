import React from 'react'
import './SignUpForm.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }
    // this.changeUsername = this.changeUsername.bind(this);
    // this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("password", this.state.password);
    window.location = "#/form";
  }
  render() {
    document.querySelector("head > title").innerHTML = "Sign In";
    document.body.style.background = "teal";
    return(
      <center>
        <div style={{background:"white", width:"800px", height:"575px", borderRadius:"80px"}}>
          <h1 id="signUpHeader">Sign In</h1>
          <input onChange={(event)=>{this.setState({username:event.target.value})}} placeholder="Username" className="signInInput"/><h1 style={{fontSize:"80px"}}></h1>
          <input onChange={(event)=>{this.setState({password:event.target.value})}} placeholder="Password" className="signInInput" type="password" style={{fontSize:"30px"}}/>
          <h1></h1><button id="signInBtn" onClick={this.onSubmit}>Sign In!</button>
        </div>
      </center>
    );
  }
}
export default SignUpForm;
