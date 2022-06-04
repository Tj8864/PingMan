import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "./home.css";
import { Link } from "react-router-dom";
import ProgressBar from "./progressBar";


class Home extends Component {
  state = { name: null, loggedIn: false, websites: [] };
  website = "";
  
  async componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (user) {
        this.setState({ name: user.name, loggedIn: true });
        const response = await fetch("http://localhost:8080/api/get_websites", {
          method: "GET",
          headers: {
            "x-access-token": token,
            "content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === "ok") this.setState({ websites: data.websites });
      }
    }
  }
  render() {
    return (
      <>
        <div className="main">
          <nav>
            <div>
              <div className="link-1">
                <Link to="/register">Register</Link>
              </div>
              {this.state.loggedIn ? (
                <div
                  className="link-2"
                  onClick={() => {
                    localStorage.removeItem("token");
                    this.setState({ name: null, loggedIn: false });
                  }}
                >
                  Log out
                </div>
              ) : (
                <div>
                  <Link to="/login">Login</Link>
                </div>
              )}
            </div>
          </nav>
          <div className="app">
            {this.state.loggedIn ? (
              <>
                <AddWebsiteForm
                  addWebsite={this.addWebsite}
                  onWebsiteChange={this.handleWebsiteChange}
                />
                <WebsiteList websites={this.state.websites} />
              </>
            ) : (
              <p>Log in to continue</p>
            )}
          </div>
        </div>
      </>
    );
  }

  handleWebsiteChange = (e) => {
    this.website = e.target.value;
  };

  
  validateURL(url) {
    return (
      url.match(
        /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g
      ) !== null
    );
  }


  addWebsite = async (e) => {
    e.preventDefault();
    if (!this.validateURL(this.website)) {
      console.log(this.website, " failed validation check");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch("http://localhost:8080/api/add_website", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteURL: this.website,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      const response = await fetch("http://localhost:8080/api/websites", {
        method: "GET",
        headers: {
          "x-access-token": token,
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      this.setState({ websites: data.websites });
    }
  };
}

class AddWebsiteForm extends Component {
  state = { expanded: false };
  render() {
    return (
      <div className="awf">
        <div
          style={{ textAlign: "center" }}
          onClick={() => {
            this.setState({ expanded: !this.state.expanded });
          }}
        >
          {this.state.expanded ? (
            <>Add a website &#9650;</>
          ) : (
            <>Add a website &#9660;</>
          )}
        </div>
        <form
          className={
            this.state.expanded ? "add-website-form" : "add-website-form-hidden"
          }
          onSubmit={this.props.addWebsite}
        >
          <input type="text" onChange={this.props.onWebsiteChange} />
          <input type="submit" value="Add Website" />
        </form>
      </div>
    );
  }
}

class WebsiteList extends Component {
  render() {
    return (
      <div>
        <ul className="website-list">
          {this.props.websites.map((website) => {
            return (
              <li
                className="website-list-item"
                key={website.websiteURL}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.setItem("website", JSON.stringify(website));
                  window.location.href = "/website/"+website.id;
                }}
              >
                <div>{website.websiteURL}</div>
                <div
                  className={website.isUp ? "text-green" : "text-red"}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {website.isUp ? "is up" : "is down"}
                  <ProgressBar
                    backgroundColor="rgb(45, 45, 64)"
                    percent={website.uptimePercent}
                    size={5}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
