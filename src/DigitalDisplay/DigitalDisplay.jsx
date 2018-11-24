import React from "react";
import empty_digit from "../assets/empty_digit.svg";
import zero_digit from "../assets/zero_digit.svg";
import one_digit from "../assets/one_digit.svg";
import two_digit from "../assets/two_digit.svg";
import three_digit from "../assets/three_digit.svg";
import four_digit from "../assets/four_digit.svg";
import five_digit from "../assets/five_digit.svg";
import six_digit from "../assets/six_digit.svg";
import seven_digit from "../assets/seven_digit.svg";
import eight_digit from "../assets/eight_digit.svg";
import nine_digit from "../assets/nine_digit.svg";
import negative_digit from "../assets/negative.svg";
import classes from "./DigitalDisplay.module.css";

const DigitalDisplay = props => {
  let num = props.val;
  let negative = num < 0 ? true : false;
  // console.log("negative: " + negative);
  if (props.val > 999) num = 999;
  else if (props.val < -99) num = -99;
  if (negative) {
    num = num * -1;
  }
  let tempNum;
  let image;
  let numArray = [];
  let index = 0;
  // console.log("rendering DigitalDisplay . . . ");
  // console.log("input value: " + num);
  do {
    tempNum = num % 10;
    switch (tempNum) {
      case 0:
        image = zero_digit;
        break;
      case 1:
        image = one_digit;
        break;
      case 2:
        image = two_digit;
        break;
      case 3:
        image = three_digit;
        break;
      case 4:
        image = four_digit;
        break;
      case 5:
        image = five_digit;
        break;
      case 6:
        image = six_digit;
        break;
      case 7:
        image = seven_digit;
        break;
      case 8:
        image = eight_digit;
        break;
      case 9:
        image = nine_digit;
        break;
    }
    // console.log("pushing value " + tempNum);
    numArray.push(
      <span className={classes.digit_container} key={index}>
        <img src={image} className={classes.digit} />
      </span>
    );
    num = Math.floor(num / 10);
    index++;
  } while (num >= 1);

  let correctNumArray = [];
  //reverse order of array
  for (let i = numArray.length - 1; i >= 0; i--) {
    correctNumArray.push(numArray[i]);
  }

  //add leading 0's padding
  while (correctNumArray.length < 3) {
    correctNumArray.splice(
      0,
      0,
      <span key={correctNumArray.length}>
        <img src={zero_digit} className={classes.digit} />
      </span>
    );
  }

  // if (props.mineCounter) {
  if (negative) {
    correctNumArray.splice(
      0,
      1,
      <span key={"negative"}>
        <img src={negative_digit} className={classes.digit} />
      </span>
    );
  }
  // else {
  //   correctNumArray.splice(
  //     0,
  //     0,
  //     <span key={"empty"}>
  //       <img src={empty_digit} className={classes.digit} />
  //     </span>
  //   );
  // }
  // }

  // console.log(correctNumArray);

  return <div className={classes.container}>{correctNumArray}</div>;
};

export default DigitalDisplay;
