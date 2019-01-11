import React, { Component } from "react";
import classes from "./DifficultySelector.module.css";

class DifficultySelector extends Component {
  state = { dropDownVisibility: "hidden" };

  mouseEnterHandler = () => {
    console.log("mouseEnterHandler called!");
    this.setState({ showDropDown: true });
  };

  mouseLeaveHandler = () => {
    console.log("mouseLeaveHandler called!");
    this.setState({ showDropDown: false });
  };
  render() {
    return (
      <div className={classes.container}>
        <span
          className={classes.buttonContainer}
          onMouseEnter={this.mouseEnterHandler}
          onMouseLeave={this.mouseLeaveHandler}
        >
          <span className={classes.difficulty}>Difficulty &#9660;</span>
          <div
            className={[
              classes.dropDown,
              this.state.showDropDown ? classes.dropDownVisible : null
            ].join(" ")}
            // style={{
            //   display: this.state.showDropDown ? "flex" : "none"
            // }}
          >
            <div
              className={classes.menuItem}
              onClick={() => this.props.changeDifficultyHandler("beginner")}
            >
              <span>
                Beginner
                {this.props.difficulty === "beginner" ? (
                  <span> &#10003;</span>
                ) : null}
              </span>
            </div>
            <div
              className={classes.menuItem}
              onClick={() => this.props.changeDifficultyHandler("intermediate")}
            >
              <span>
                Intermediate
                {this.props.difficulty === "intermediate" ? (
                  <span> &#10003;</span>
                ) : null}
              </span>
            </div>
            <div
              className={classes.menuItem}
              onClick={() => this.props.changeDifficultyHandler("expert")}
            >
              <span>
                Expert{" "}
                {this.props.difficulty === "expert" ? (
                  <span> &#10003;</span>
                ) : null}
              </span>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export default DifficultySelector;
