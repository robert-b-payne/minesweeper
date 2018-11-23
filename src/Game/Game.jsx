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
    width: 20, //32 x 32 in production
    height: 20,
    numMines: 35,
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
          unopened: true,
          flag: false,
          adjacentMines: 0,
          searchingAdjacent: false //recursive breadcrumb to improve performance
        });
      }
      this.state.level.push(row);
    }
    console.log("setting mines . . . ");
    this.state.mines.forEach(x => {
      this.state.level[x[0]][x[1]].mine = true;
    });
    for (let i = 0; i < this.state.height; i++) {
      for (let j = 0; j < this.state.width; j++) {
        this.state.level[i][j].adjacentMines = this.countMines([i, j]);
      }
    }
  }

  countMines = loc => {
    // console.log("counting mines . . . at " + loc);
    //[row][col]
    let numMines = 0;

    // if (loc[0] === 5 && loc[1] === 5) {
    //   console.log("top left of (5,5):");
    //   console.log(this.state.level[(loc[0] - 1, loc[1] - 1)]);
    //   console.log("top middle of (5,5):");
    //   console.log(this.state.level[(loc[0] - 1, loc[1])]);
    //   console.log("top right of (5,5):");
    //   console.log(this.state.level[(loc[0] - 1, loc[1] + 1)]);
    //   console.log("left of (5,5):");
    //   console.log(this.state.level[(loc[0], loc[1] - 1)]);
    //   console.log("right of (5,5):");
    //   console.log(this.state.level[(loc[0], loc[1] + 1)]);
    //   console.log("bottom left of (5,5):");
    //   console.log(this.state.level[(loc[0] + 1, loc[1] - 1)]);
    //   console.log("bottom middle of (5,5):");
    //   console.log(this.state.level[(loc[0] + 1, loc[1])]);
    //   console.log("bottom right of (5,5):");
    //   console.log(this.state.level[(loc[0] + 1, loc[1] + 1)]);
    // }

    //check top left
    if (loc[0] >= 1 && loc[1] >= 1) {
      if (this.state.level[loc[0] - 1][loc[1] - 1].mine) numMines++;
    }
    //check top middle
    if (loc[0] >= 1) {
      if (this.state.level[loc[0] - 1][loc[1]].mine) numMines++;
    }
    //check top right
    if (loc[0] >= 1 && loc[1] < this.state.width - 1) {
      if (this.state.level[loc[0] - 1][loc[1] + 1].mine) numMines++;
    }
    //check left
    if (loc[1] >= 1) {
      if (this.state.level[loc[0]][loc[1] - 1].mine) numMines++;
    }
    //check right
    if (loc[1] < this.state.width - 1) {
      if (this.state.level[loc[0]][loc[1] + 1].mine) numMines++;
    }
    //check bottom left
    if (loc[0] < this.state.height - 1 && loc[1] >= 1) {
      if (this.state.level[loc[0] + 1][loc[1] - 1].mine) numMines++;
    }
    //check bottom middle
    if (loc[0] < this.state.height - 1) {
      if (this.state.level[loc[0] + 1][loc[1]].mine) numMines++;
    }
    //check bottom right
    if (loc[0] < this.state.height - 1 && loc[1] < this.state.width - 1) {
      if (this.state.level[loc[0] + 1][loc[1] + 1].mine) numMines++;
    }
    // if (numMines) console.log(numMines + " mines at " + loc);
    return numMines;
  };

  generateMine = () => {
    let mine = [
      Math.floor(Math.random() * this.state.height),
      Math.floor(Math.random() * this.state.width)
    ];
    return mine;
  };

  generateMines = () => {
    // console.log("Generating mines . . . ");
    let mines = [];
    let mine;
    let flag;
    for (let i = 0; i < this.state.numMines; i++) {
      do {
        flag = false;
        mine = this.generateMine();
        // console.log("generated mine location: " + mine);
        for (let j = 0; j < mines.length; j++) {
          if (mine[0] === mines[j][0] && mine[1] === mines[j][1]) {
            flag = true;
            break;
          }
        }
      } while (flag);
      mines.push(mine);
    }
    // console.log(mines);
    return mines;
  };

  openTiles = loc => {
    // console.log("opening adjacent!");
    let levelCopy = this.copyArray(this.state.level);
    // console.log("loc");
    // console.log(loc);
    // console.log("levelCopy:");
    // console.log(levelCopy);
    levelCopy[loc[0]][loc[1]].searchingAdjacent = true;
    levelCopy[loc[0]][loc[1]].unopened = false;
    this.setState({ level: levelCopy }, () => {
      //check for horizontally/vertically adjacent tiles for numbered tiles
      //top
      if (loc[0] >= 1) {
        if (
          this.state.level[loc[0] - 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1]].mine
        ) {
          levelCopy = this.copyArray(this.state.level);
          levelCopy[loc[0] - 1][loc[1]].unopened = false;
          this.setState({ level: levelCopy });
        }
      }
      //bottom
      if (loc[0] < this.state.height - 1) {
        if (
          this.state.level[loc[0] + 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1]].mine
        ) {
          levelCopy = this.copyArray(this.state.level);
          levelCopy[loc[0] + 1][loc[1]].unopened = false;
          this.setState({ level: levelCopy });
        }
      }
      //left
      if (loc[1] >= 1) {
        if (
          this.state.level[loc[0]][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] - 1].mine
        ) {
          levelCopy = this.copyArray(this.state.level);
          levelCopy[loc[0]][loc[1] - 1].unopened = false;
          this.setState({ level: levelCopy });
        }
      }
      // right
      if (loc[1] < this.state.width - 1) {
        if (
          this.state.level[loc[0]][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] + 1].mine
        ) {
          levelCopy = this.copyArray(this.state.level);
          levelCopy[loc[0]][loc[1] + 1].unopened = false;
          this.setState({ level: levelCopy });
        }
      }

      //check for tiles with no mines
      //check top left
      if (loc[0] >= 1 && loc[1] >= 1) {
        if (
          !this.state.level[loc[0] - 1][loc[1] - 1].searchingAdjacent &&
          !this.state.level[loc[0] - 1][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1] - 1].mine
        )
          this.openTiles([loc[0] - 1, loc[1] - 1]);
      }
      //check top
      if (loc[0] >= 1) {
        if (
          !this.state.level[loc[0] - 1][loc[1]].searchingAdjacent &&
          !this.state.level[loc[0] - 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1]].mine
        )
          this.openTiles([loc[0] - 1, loc[1]]);
      }
      //check top right
      if (loc[0] >= 1 && loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0] - 1][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0] - 1][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1] + 1].mine
        )
          this.openTiles([loc[0] - 1, loc[1] + 1]);
      }
      //check left
      if (loc[1] >= 1) {
        if (
          !this.state.level[loc[0]][loc[1] - 1].searchingAdjacent &&
          !this.state.level[loc[0]][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] - 1].mine
        )
          this.openTiles([loc[0], loc[1] - 1]);
      }
      //check right
      if (loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0]][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0]][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] + 1].mine
        )
          this.openTiles([loc[0], loc[1] + 1]);
      }
      //check bottom left
      if (loc[0] < this.state.height - 1 && loc[1] >= 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1] - 1].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1] - 1].mine
        )
          this.openTiles([loc[0] + 1, loc[1] - 1]);
      }
      //check bottom
      if (loc[0] < this.state.height - 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1]].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1]].mine
        )
          this.openTiles([loc[0] + 1, loc[1]]);
      }
      //check bottom right
      if (loc[0] < this.state.height - 1 && loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1] + 1].mine
        )
          this.openTiles([loc[0] + 1, loc[1] + 1]);
      }
    });
  };

  openTilesFinished = () => {};

  clickHandler = (index, event) => {
    console.log(
      "clickHandler called with mouse value: " +
        event.button +
        " and index value: " +
        index
    );
    let levelCopy = this.copyArray(this.state.level);

    if (event.button === 2 && levelCopy[index[0]][index[1]].unopened) {
      levelCopy[index[0]][index[1]].flag = !levelCopy[index[0]][index[1]].flag;
    } else if (event.button === 0 && !levelCopy[index[0]][index[1]].flag) {
      levelCopy[index[0]][index[1]].unopened = false;
      if (
        !levelCopy[index[0]][index[1]].adjacentMines &&
        !levelCopy[index[0]][index[1]].mine
      )
        this.openTiles([index[0], index[1]]);
    } else return;
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
        <p>React Minesweeper v{this.state.version.toFixed(1)}</p>
        <div className={classes.GameContainer}>{gameWorld}</div>
      </div>
    );
  }
}

export default Game;
