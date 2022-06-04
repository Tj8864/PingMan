import React, { Component } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "./progressBar";
import "./websiteInfo.css";

class WebsiteInfoo extends Component {
  state = { Website: null };

  componentDidMount = async () => {
    this.getWebsite().then(() => {
      console.log("Website: ", this.Website);
    });
    this.token = localStorage.getItem("token");
  };

  render() {
    console.log(this.props.website.address);
    if (!this.state.Website) return <div />;
    return (
      <div className="info-main">
        <nav className="info-nav">
          <div className="website-title">{this.Website?.websiteURL}</div>
          {this.token && (
            <button onClick={() => console.log("Clicked")}>
              Add to dashboard
            </button>
          )}
        </nav>
        <div className="info">
          <div className="information">
            Information
            <ul>
              <li>
                <strong>Total Down Time: &nbsp;&nbsp; </strong>
                {this.state.Website.totalDowntime / 1000} seconds
              </li>
              <li>
                <strong>Last Check: &nbsp;&nbsp; </strong>
                {this.state.Website.lastCheck}
              </li>
              <li>
                <strong>Last successful Check: &nbsp;&nbsp; </strong>
                {this.state.Website.lastUpTime}
              </li>
              <li>
                <strong>Currently up: &nbsp;&nbsp; </strong>
                {this.state.Website.isUp ? "Yes" : "No"}
              </li>
            </ul>
          </div>
          <div style={{ padding: "5em", color: "white", height: "90vh" }}>
            <ProgressBar
              size={36}
              percent={this.state.Website.uptimePercent}
              backgroundColor="rgb(25,25,34)"
            />
          </div>
        </div>
      </div>
    );
  }

  getWebsite = async () => {
    console.log(
      "called: ",
      JSON.stringify({
        id: this.props.website.address,
      })
    );
    const response = await fetch(
      "http://localhost:8080/api/websiteinfo?id=" + this.props.website.address,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    console.log("response:", response);
    const data = await response.json();
    console.log("Data: ", data);
    this.setState({ Website: data.website });
  };
}

const WebsiteInfo = () => {
  return <WebsiteInfoo website={useParams()} />;
};

export default WebsiteInfo;
