import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./register.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    failed: false,
    registered: false,
  };

  
  render() {
    return (
      <>
        <div class="register-root">
          <nav>
            <a href="/home"><strong>&#8962;</strong> Home</a>
          </nav>
          <div className="register-box">
            {this.state.failed && (
              <div className="failed-dialogue">Unable to create account</div>
            )}
            {this.state.registered && <Navigate to="/login"></Navigate>}
            <form className="register-form" onSubmit={this.validateSubmit}>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <br />
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
              <input type="submit" value="Register" />
            </form>
          </div>
        </div>
      </>
    );
  }
  
  validateSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      this.setState({ failed: false, registered: true });
    } else {
      this.setState({ failed: true });
    }
  };
}

export default Register;
