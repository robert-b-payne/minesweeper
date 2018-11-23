import React, { Component } from "react";
import classes from "./Square.module.css";

import zero from "../assets/Minesweeper_0.svg";
import one from "../assets/Minesweeper_1.svg";
import two from "../assets/Minesweeper_2.svg";
import three from "../assets/Minesweeper_3.svg";
import four from "../assets/Minesweeper_4.svg";
import five from "../assets/Minesweeper_5.svg";
import six from "../assets/Minesweeper_6.svg";
import seven from "../assets/Minesweeper_7.svg";
import eight from "../assets/Minesweeper_8.svg";
import flag from "../assets/Minesweeper_flag.svg";
import unopened from "../assets/Minesweeper_unopened_square.svg";
import mine from "../assets/mine.png";
import red from "../assets/Minesweeper_red.svg";

class Square extends Component {
  // state = {  }

  contextMenuHandler = event => {
    console.log("contextMenu handler called!");
    event.preventDefault();
  };

  render() {
    let classesString = [classes.Square];
    if (this.props.color) {
      classesString.push(classes[this.props.color]);
      classesString = classesString.join(" ");
    }
    let image;
    switch (this.props.level.adjacentMines) {
      case 0:
        image = zero;
        break;
      case 1:
        image = one;
        break;
      case 2:
        image = two;
        break;
      case 3:
        image = three;
        break;
      case 4:
        image = four;
        break;
      case 5:
        image = five;
        break;
      case 6:
        image = six;
        break;
      case 7:
        image = seven;
        break;
      case 8:
        image = eight;
        break;
      default:
        image = zero;
    }

    if (this.props.level.mine) image = zero;
    if (this.props.level.clickedMine) image = red;
    if (this.props.level.unopened && !this.props.showAll) image = unopened;
    if (this.props.level.flag) image = flag;
    if (this.props.level.guessedWrong && this.props.showAll) image = zero;

    let x = (
      <span className={[classes.x, classes.mine].join(" ")}>&#x2715;</span>
    );
    return (
      <React.Fragment>
        <div
          className={classes.Square}
          onMouseDown={event =>
            this.props.clickHandler(this.props.index, event)
          }
          onContextMenu={event => this.contextMenuHandler(event)}
        >
          <img className={classes.Image} src={image} />
          {(this.props.level.mine || this.props.level.guessedWrong) &&
          (!this.props.level.unopened || this.props.showAll) &&
          !(!this.props.level.guessedWrong && this.props.level.flag) ? ( //mine picture
            <img src={mine} className={classes.mine} />
          ) : null}
          {this.props.level.guessedWrong && this.props.showAll ? x : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Square;
