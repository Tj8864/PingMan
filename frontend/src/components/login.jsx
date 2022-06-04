import React, { Component } from "react";
import { Navigate as Redirect } from "react-router-dom";
import "./login.css";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = { email: "", password: "", failed: false, loggedIn: false };

  async componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      console.log("user: ", user);
      this.setState({ loggedIn: true });
    } else {
      console.log("No user logged in");
    }
  }
  
  render() {
    return (
      <>
        <div className="login-root">
          <nav>
            <a href="/home">
              <strong>&#8962;</strong> Home
            </a>
          </nav>
          {this.state.loggedIn ? <Redirect to="/home" /> : <></>}
          <div className="login-box">
            {this.state.failed && (
              <div className="failed-dialogue">
                Invalid Credentials, please try again{" "}
              </div>
            )}
            <form className="login-form" onSubmit={this.validateSubmit}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <br />
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </>
    );
  }

  validateSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      localStorage.setItem("token", data.token);
      this.setState({ failed: false, loggedIn: true });
    } else {
      this.setState({ failed: true });
    }
  };
  
}

export default Login;
