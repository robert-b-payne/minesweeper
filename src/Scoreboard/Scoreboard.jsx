import React, { Component } from "react";
import Smiley from "../assets/smiley.svg";
import Glasses from "../assets/glasses.svg";
import Surprised from "../assets/surprised.svg";
import Dead from "../assets/dead.svg";
import classes from "./Scoreboard.module.css";
import DigitalDisplay from "../DigitalDisplay/DigitalDisplay";

class Scoreboard extends Component {
  render() {
    let image = this.props.gameover
      ? Dead
      : this.props.victory
      ? Glasses
      : this.props.clicking
      ? Surprised
      : Smiley;
    return (
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <span className={classes.remaining}>
            <DigitalDisplay val={20} />
          </span>
          <span onClick={this.props.resetHandler}>
            <img className={classes.resetButton} src={image} />
          </span>
          <span className={classes.time}>
            <DigitalDisplay val={this.props.time} />
          </span>
        </div>
      </div>
    );
  }
}

export default Scoreboard;
