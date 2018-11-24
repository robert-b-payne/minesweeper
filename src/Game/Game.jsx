import React, { Component } from "react";
import Square from "../Square/Square";
import classes from "./Game.module.css";
import Scoreboard from "../Scoreboard/Scoreboard";
import DigitalDisplay from "../DigitalDisplay/DigitalDisplay";

class Game extends Component {
  state = {
    version: 1.0,
    width: 20, //32 x 32 in production
    height: 20,
    numMines: 5,
    level: null,
    // mines: null,
    background: null, //background array, all grey
    difficulty: "easy",
    showAll: false,
    gameover: false,
    victory: false,
    time: 0,
    timerId: null,
    minesRemaining: 0,
    flagCounter: 0
  };

  constructor() {
    super();
    //initialize level array
    console.log("Minesweeper v" + this.state.version);
    this.state.flagCounter = this.state.numMines;
    this.state.minesRemaining = this.state.numMines;
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
          searchingAdjacent: false, //recursive breadcrumb
          clickedMine: false, //when clicking on a mine, a red X will appear on top
          guessedWrong: false
        });
      }
      this.state.level.push(row);
    }
    // console.log("setting mines . . . ");
    this.state.mines.forEach(x => {
      this.state.level[x[0]][x[1]].mine = true;
    });
    for (let i = 0; i < this.state.height; i++) {
      for (let j = 0; j < this.state.width; j++) {
        this.state.level[i][j].adjacentMines = this.countMines([i, j]);
      }
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  countMines = loc => {
    // console.log("counting mines . . . at " + loc);
    //[row][col]
    let numMines = 0;

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
    levelCopy[loc[0]][loc[1]].searchingAdjacent = true;
    levelCopy[loc[0]][loc[1]].unopened = false;
    this.setState({ level: levelCopy }, () => {
      //check for horizontally/vertically adjacent tiles for numbered tiles
      //top
      if (loc[0] >= 1) {
        if (
          this.state.level[loc[0] - 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1]].mine &&
          !this.state.level[loc[0] - 1][loc[1]].flag
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
          !this.state.level[loc[0] + 1][loc[1]].mine &&
          !this.state.level[loc[0] + 1][loc[1]].flag
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
          !this.state.level[loc[0]][loc[1] - 1].mine &&
          !this.state.level[loc[0]][loc[1] - 1].flag
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
          !this.state.level[loc[0]][loc[1] + 1].mine &&
          !this.state.level[loc[0]][loc[1] + 1].flag
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
          !this.state.level[loc[0] - 1][loc[1] - 1].mine &&
          !this.state.level[loc[0] - 1][loc[1] - 1].flag
        )
          this.openTiles([loc[0] - 1, loc[1] - 1]);
      }
      //check top
      if (loc[0] >= 1) {
        if (
          !this.state.level[loc[0] - 1][loc[1]].searchingAdjacent &&
          !this.state.level[loc[0] - 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1]].mine &&
          !this.state.level[loc[0] - 1][loc[1]].flag
        )
          this.openTiles([loc[0] - 1, loc[1]]);
      }
      //check top right
      if (loc[0] >= 1 && loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0] - 1][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0] - 1][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0] - 1][loc[1] + 1].mine &&
          !this.state.level[loc[0] - 1][loc[1] + 1].flag
        )
          this.openTiles([loc[0] - 1, loc[1] + 1]);
      }
      //check left
      if (loc[1] >= 1) {
        if (
          !this.state.level[loc[0]][loc[1] - 1].searchingAdjacent &&
          !this.state.level[loc[0]][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] - 1].mine &&
          !this.state.level[loc[0]][loc[1] - 1].flag
        )
          this.openTiles([loc[0], loc[1] - 1]);
      }
      //check rightton onClick={this.resetHandler}>New Game</button>
      if (loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0]][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0]][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0]][loc[1] + 1].mine &&
          !this.state.level[loc[0]][loc[1] + 1].flag
        )
          this.openTiles([loc[0], loc[1] + 1]);
      }
      //check bottom left
      if (loc[0] < this.state.height - 1 && loc[1] >= 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1] - 1].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1] - 1].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1] - 1].mine &&
          !this.state.level[loc[0] + 1][loc[1] - 1].flag
        )
          this.openTiles([loc[0] + 1, loc[1] - 1]);
      }
      //check bottom
      if (loc[0] < this.state.height - 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1]].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1]].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1]].mine &&
          !this.state.level[loc[0] + 1][loc[1]].flag
        )
          this.openTiles([loc[0] + 1, loc[1]]);
      }
      //check bottom right
      if (loc[0] < this.state.height - 1 && loc[1] < this.state.width - 1) {
        if (
          !this.state.level[loc[0] + 1][loc[1] + 1].searchingAdjacent &&
          !this.state.level[loc[0] + 1][loc[1] + 1].adjacentMines &&
          !this.state.level[loc[0] + 1][loc[1] + 1].mine &&
          !this.state.level[loc[0] + 1][loc[1] + 1].flag
        )
          this.openTiles([loc[0] + 1, loc[1] + 1]);
      }
    });
  };

  endGame = victory => {
    this.stopTimer();
    this.setState({ showAll: true, gameover: true, victory: victory });
  };

  clickHandler = (index, event) => {
    if (!this.state.gameover) {
      console.log(
        "clickHandler called with mouse value: " +
          event.button +
          " and index value: " +
          index
      );
      let levelCopy = this.copyArray(this.state.level);
      let flagCounter = this.state.flagCounter;
      let minesRemaining = this.state.minesRemaining;
      //if right click
      if (event.button === 2 && levelCopy[index[0]][index[1]].unopened) {
        levelCopy[index[0]][index[1]].flag = !levelCopy[index[0]][index[1]]
          .flag;
        if (levelCopy[index[0]][index[1]].flag) {
          flagCounter--;
          if (levelCopy[index[0]][index[1]].mine) minesRemaining--;
        } else {
          flagCounter++;
          if (levelCopy[index[0]][index[1]].mine) minesRemaining++;
        }

        if (!levelCopy[index[0]][index[1]].mine)
          levelCopy[index[0]][index[1]].guessedWrong = !levelCopy[index[0]][
            index[1]
          ].guessedWrong;
      }
      //if left click
      else if (event.button === 0 && !levelCopy[index[0]][index[1]].flag) {
        levelCopy[index[0]][index[1]].unopened = false;
        if (
          !levelCopy[index[0]][index[1]].adjacentMines &&
          !levelCopy[index[0]][index[1]].mine
        )
          this.openTiles([index[0], index[1]]);
        else if (levelCopy[index[0]][index[1]].mine) {
          console.log("You clicked on a mine. Game over!");
          levelCopy[index[0]][index[1]].clickedMine = true; //check if clicked on mine
          this.endGame(false);
        }
      } else return;

      this.setState(
        {
          level: levelCopy,
          flagCounter: flagCounter,
          minesRemaining: minesRemaining
        },
        () => {
          if (minesRemaining === 0 && flagCounter === 0) this.endGame(true);
        }
      );
    }
  };

  copyArray = a => {
    let copiedArray = a.map(x => {
      if (Array.isArray(x)) return this.copyArray(x);
      else return x;
    });
    return copiedArray;
  };

  // mouseUpHandler = () => {
  //   console.log(
  //     "===================================mouseUpHandler called!==================================="
  //   );
  //   this.setState({ scaredFace: false });
  // };

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
            // onMouseUp={this.mouseUpHandler}
            showAll={this.state.showAll}
          />
        );
      }
      squareArray.push(<div key={i}>{squareRow}</div>);
      //   squareArray.push(<br key={i} style={{ lineHeight: "0" }} />);
    }
    return squareArray;
  };

  startTimer = () => {
    let timerId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);

    this.setState({ timerId: timerId });
  };

  stopTimer = () => {
    clearInterval(this.state.timerId);
  };

  restartTimer = () => {
    this.stopTimer();
    this.setState({ time: 0 }, () => {
      this.startTimer();
    });
  };

  resetHandler = () => {
    this.restartTimer();
    // console.log("resetting game . . . ");
    let row = [];
    let newLevel = [];
    let newMines = this.generateMines();
    // console.log("mines generated!");
    // console.log(newMines);
    for (let i = 0; i < this.state.height; i++) {
      row = [];
      for (let j = 0; j < this.state.width; j++) {
        row.push({
          mine: false,
          unopened: true,
          flag: false,
          adjacentMines: 0,
          searchingAdjacent: false, //recursive breadcrumb
          clickedMine: false, //when clicking on a mine, a red X will appear on top
          guessedWrong: false
        });
      }
      newLevel.push(row);
    }
    // console.log("blank level generated:");
    // console.log(newLevel);
    // console.log("setting mines . . . ");
    newMines.forEach(x => {
      // console.log(x);
      newLevel[x[0]][x[1]].mine = true;
    });
    // console.log("mines set:");
    // console.log(newLevel);
    // console.log("calculating adjacent mines . . . ");
    this.setState(
      {
        level: newLevel
      },
      () => {
        for (let i = 0; i < this.state.height; i++) {
          for (let j = 0; j < this.state.width; j++) {
            newLevel[i][j].adjacentMines = this.countMines([i, j]);
          }
        }
        // console.log("adjacent mines calculated!");
        // console.log(newLevel);
        this.setState({
          level: newLevel,
          gameover: false,
          showAll: false,
          victory: false,
          flagCounter: this.state.numMines,
          minesRemaining: this.state.numMines
        });
      }
    );
  };

  render() {
    const gameWorld = this.initializeSquares();
    return (
      <div>
        <p>React Minesweeper</p>
        {/* <button onClick={this.resetHandler}>New Game</button> */}
        <div className={classes.GameContainer}>
          <Scoreboard
            time="0"
            flagCounter={this.state.flagCounter}
            resetHandler={this.resetHandler}
            gameover={this.state.gameover}
            victory={this.state.victory}
            time={this.state.time}
            // scaredFace={this.state.scaredFace}
          />
          {gameWorld}
        </div>
        {/* {this.state.gameover ? <p>Game Over!</p> : null} */}
      </div>
    );
  }
}

export default Game;
