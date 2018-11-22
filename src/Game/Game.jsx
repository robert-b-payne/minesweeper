import React, { Component } from "react";
import Square from "../Square/Square";
import classes from "./Game.module.css";
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
class Game extends Component {
  state = {
    version: 1.0,
    width: 32, //32 x 32 in production
    height: 32,
    level: null,
    background: null //background array, all grey
  };

  constructor() {
    super();
    //initialize level array
    console.log("react snake " + this.state.version);
    console.log("resetting game!");
    let row = [];
    this.state.level = [];
    for (let i = 0; i < this.state.height; i++) {
      row = [];
      for (let j = 0; j < this.state.width; j++) {
        row.push("untouched");
      }
      this.state.level.push(row);
    }
  }

  initializeSquares = () => {
    let squareRow;
    let squareArray = [];
    for (let i = 0; i < this.state.height; i++) {
      squareRow = [];
      for (let j = 0; j < this.state.width; j++) {
        squareRow.push(
          <Square
            // color={this.state.level[i][j]}
            key={i.toString().padStart(4, "0") + j.toString().padStart(4, "0")}
            image={unopened}
          />
        );
      }
      squareArray.push(squareRow);
      squareArray.push(<br key={i} />);
    }
    return squareArray;
  };

  render() {
    const gameWorld = this.initializeSquares();
    return (
      <div>
        <p>Minesweeper Game Component</p>
        <div className={classes.GameContainer}>{gameWorld}</div>
      </div>
    );
  }
}

export default Game;
