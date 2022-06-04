import React, { Component } from "react";
import './progressBar.css'

class ProgressBar extends Component {
  render() {
    const ratio = this.props.percent/100;
    return (
      <div>
        <div className="big-circle" style={{ height:this.props.size+'vw', width:this.props.size+'vw', background: 'conic-gradient(rgb('+255*(1-ratio)+', '+255*(ratio)+',0) '+ratio+'turn, black '+ratio+'turn, black 1turn)'}}>
            <div className="inner-circle" style={{background: this.props.backgroundColor, lineHeight: this.props.size*0.8 + 'vw', fontSize: this.props.size/6 + 'vw'}}>
                {Math.floor(this.props.percent*1000)/1000}%
            </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
