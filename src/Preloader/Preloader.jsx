import React from "react";

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
import Smiley from "../assets/smiley.svg";
import Glasses from "../assets/glasses.svg";
import Surprised from "../assets/surprised.svg";
import Dead from "../assets/dead.svg";

const Preloader = () => {
  return (
    <div
      style={{ display: "none", width: "0px", height: "0px", overflow: "none" }}
    >
      <img src={zero_digit} alt="preloaded_image" />
      <img src={one_digit} alt="preloaded_image" />
      <img src={two_digit} alt="preloaded_image" />
      <img src={three_digit} alt="preloaded_image" />
      <img src={four_digit} alt="preloaded_image" />
      <img src={five_digit} alt="preloaded_image" />
      <img src={six_digit} alt="preloaded_image" />
      <img src={seven_digit} alt="preloaded_image" />
      <img src={eight_digit} alt="preloaded_image" />
      <img src={nine_digit} alt="preloaded_image" />
      <img src={negative_digit} alt="preloaded_image" />
      <img src={zero} alt="preloaded_image" />
      <img src={one} alt="preloaded_image" />
      <img src={two} alt="preloaded_image" />
      <img src={three} alt="preloaded_image" />
      <img src={four} alt="preloaded_image" />
      <img src={five} alt="preloaded_image" />
      <img src={six} alt="preloaded_image" />
      <img src={seven} alt="preloaded_image" />
      <img src={eight} alt="preloaded_image" />
      <img src={flag} alt="preloaded_image" />
      <img src={unopened} alt="preloaded_image" />
      <img src={mine} alt="preloaded_image" />
      <img src={red} alt="preloaded_image" />
      <img src={Smiley} alt="preloaded_image" />
      <img src={Glasses} alt="preloaded_image" />
      <img src={Surprised} alt="preloaded_image" />
      <img src={Dead} alt="preloaded_image" />
    </div>
  );
};

export default Preloader;
