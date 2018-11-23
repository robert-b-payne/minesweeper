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
import mine from "../assets/mine.png";
class Game extends Component {
  state = {
    version: 1.0,
    width: 32, //32 x 32 in production
    height: 32,
    numMines: 25,
    level: null,
    mines: null,
    background: null, //background array, all grey
    difficulty: "easy"
  };

  constructor() {
    super();
    //initialize level array
    console.log("Minesweeper v" + this.state.version);
    let row = [];
    this.state.level = [];
    this.state.mines = this.generateMines();
    for (let i = 0; i < this.state.height; i++) {
      row = [];
      for (let j = 0; j < this.state.width; j++) {
        row.push({
          mine: false,
          unopened: false,
          adjacentMines: 0,
          searchingAdjacent: false //probably don't need
        });
      }
      this.state.level.push(row);
    }
    console.log("setting mines . . . ");
    this.state.mines.forEach(x => {
      this.state.level[x[0]][x[1]].mine = true;
      //   console.log(this.state.level)
    });
  }

  generateMine = () => {
    let mine = [
      Math.floor(Math.random() * this.state.height),
      Math.floor(Math.random() * this.state.width)
    ];
    return mine;
  };

  generateMines = () => {
    console.log("Generating mines . . . ");
    let mines = [];
    let mine;
    let flag;
    for (let i = 0; i < this.state.numMines; i++) {
      do {
        flag = false;
        mine = this.generateMine();
        console.log("generated mine location: " + mine);
        for (let j = 0; j < mines.length; j++) {
          if (mine[0] === mines[j][0] && mine[1] === mines[j][1]) {
            flag = true;
            break;
          }
        }
      } while (flag);
      mines.push(mine);
    }
    console.log(mines);
    return mines;
  };

  clickHandler = index => {
    console.log("clickHandler called with value: " + index);
    let levelCopy = this.copyArray(this.state.level);
    levelCopy[index[0]][index[1]].unopened = false;
    this.setState({ level: levelCopy });
  };

  copyArray = a => {
    let copiedArray = a.map(x => {
      if (Array.isArray(x)) return this.copyArray(x);
      else return x;
    });
    return copiedArray;
  };

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
            index={[i, j]}
            // image={
            //   this.state.level[i][j].unopened
            //     ? unopened
            //     : this.state.level[i][j].mine
            //     ? mine
            //     : this.state.level[i][j].adjacentMines
            // }
            level={this.state.level[i][j]}
            clickHandler={this.clickHandler}
          />
        );
      }
      squareArray.push(<div key={i}>{squareRow}</div>);
      //   squareArray.push(<br key={i} style={{ lineHeight: "0" }} />);
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
