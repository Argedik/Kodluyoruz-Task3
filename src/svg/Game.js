/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import randomN from "../utils/Calculator";

const GameCanvas = (props) => {
  let checkTrue = false;
  const navigate = useNavigate();
  const [pointN, setPointN] = useState(0);
  const [tourN, setTourN] = useState("0");
  const [bgColor, setBgColor] = useState("#2d2d2d");
  const [trueBtnClass, setTrueBtnClass] = useState("none-game");
  const [trueBtnClass1, setTrueBtnClass1] = useState("none-game");
  const [trueBtnClass2, setTrueBtnClass2] = useState("none-game");
  const [trueCircleClass, setTrueCircleClass] = useState("none-circle");
  const [trueCircleClass1, setTrueCircleClass1] = useState("none-circle");
  const [trueCircleClass2, setTrueCircleClass2] = useState("none-circle");
  const [primaryRN, setPrimaryRN] = useState(1);
  const [secondaryRN, setSecondaryRN] = useState(2);
  const [tertiaryRN, setTertiaryRN] = useState(3);
  const [lastQuestion, setLastQuestion] = useState("1*2");
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState();

  function database(answer) {
    if (answer === lastCorrectAnswer) {
      setBgColor("#00BF63");
      checkTrue = true;
      if (primaryRN === lastCorrectAnswer) {
        setTrueBtnClass("true-game disable");
        setTrueCircleClass("true-circle disable");
        setTrueBtnClass2("none-game disable");
        setTrueCircleClass2("none-circle disable");
        setTrueBtnClass1("none-game disable");
        setTrueCircleClass1("none-circle disable");
      } else if (secondaryRN === lastCorrectAnswer) {
        setTrueBtnClass("none-game disable");
        setTrueCircleClass("none-circle disable");
        setTrueBtnClass2("true-game disable");
        setTrueCircleClass2("true-circle disable");
        setTrueBtnClass1("none-game disable");
        setTrueCircleClass1("none-circle disable");
      } else if (tertiaryRN === lastCorrectAnswer) {
        setTrueBtnClass("none-game disable");
        setTrueCircleClass("none-circle disable");
        setTrueBtnClass2("none-game disable");
        setTrueCircleClass2("none-circle disable");
        setTrueBtnClass1("true-game disable");
        setTrueCircleClass1("true-circle disable");
      }
    } else if (answer !== lastCorrectAnswer) {
      checkTrue = false;
      setBgColor("#FA0000");
      let a = 3;
      if (primaryRN === answer) {
        a = 0;
        setTrueBtnClass("true-game disable");
        setTrueCircleClass("true-circle disable");
      } else if (secondaryRN === answer) {
        a = 1;
        setTrueBtnClass2("true-game disable");
        setTrueCircleClass2("true-circle disable");
      } else if (tertiaryRN === answer) {
        a = 2;
        setTrueBtnClass1("true-game disable");
        setTrueCircleClass1("true-circle disable");
      }

      if (primaryRN === lastCorrectAnswer) {
        setTrueBtnClass("false-game");
        setTrueCircleClass("false-circle");
        if (a === 1) {
          setTrueBtnClass1("none-game disable");
          setTrueCircleClass1("none-game disable");
        } else {
          setTrueBtnClass2("none-game disable");
          setTrueCircleClass2("none-game disable");
        }
      } else if (secondaryRN === lastCorrectAnswer) {
        if (a === 0) {
          setTrueBtnClass1("none-game disable");
          setTrueCircleClass1("none-game disable");
        } else {
          setTrueBtnClass("none-game disable");
          setTrueCircleClass("none-game disable");
        }
        setTrueBtnClass2("false-game disable");
        setTrueCircleClass2("false-circle disable");
      } else if (tertiaryRN === lastCorrectAnswer) {
        if (a === 0) {
          setTrueBtnClass2("none-game disable");
          setTrueCircleClass2("none-game disable");
        } else {
          setTrueBtnClass("none-game disable");
          setTrueCircleClass("none-game disable");
        }
        setTrueBtnClass1("false-game disable");
        setTrueCircleClass1("false-circle disable");
      }
    }
    setTimeout(() => {
      setTrueBtnClass("none-game enable");
      setTrueBtnClass1("none-game enable");
      setTrueBtnClass2("none-game enable");
      setTrueCircleClass("none-circle enable");
      setTrueCircleClass1("none-circle enable");
      setTrueCircleClass2("none-circle enable");

      let jsonData = JSON.parse(localStorage.getItem("items"));
      console.log("🚀 ~ //setTimeout ~ jsonData", jsonData);
      let point =
        lastCorrectAnswer === answer
          ? jsonData["point"] + Math.round(Math.sqrt(lastCorrectAnswer))
          : jsonData["point"];

      let gameObject = {};
      let numberForQuestion = randomN(2, 9);
      let numberForQuestion2 = randomN(2, 9);

      gameObject = {
        question: `${numberForQuestion} * ${numberForQuestion2}`,
        numberForQuestion: (numberForQuestion - 1) * numberForQuestion2,
        numberForQuestion2: (numberForQuestion + 1) * numberForQuestion2,
        numberForQuestion3: numberForQuestion * numberForQuestion2,
        correctAnswerForQuestion: numberForQuestion * numberForQuestion2,
      };
      console.log(
        "🚀 ~ file: Game.js ~ line 131 ~ //setTimeout ~ gameObject",
        gameObject
      );

      setLastQuestion(gameObject.question);
      setLastCorrectAnswer(gameObject.correctAnswerForQuestion);

      let list = [];
      let final = 0;
      let index = 0;
      while (final === 0) {
        let randomNumer = randomN(0, 2);
        if (
          list[0] !== randomNumer &&
          list[1] !== randomNumer &&
          list[2] !== randomNumer
        ) {
          list[index] = randomNumer;
          if (index !== 2) {
            index++;
          } else {
            final = 1;
          }
        }
      }
      let newList = [];
      newList[list[0]] = gameObject.numberForQuestion;
      newList[list[1]] = gameObject.numberForQuestion2;
      newList[list[2]] = gameObject.numberForQuestion3;
      console.log(
        "🚀 ~ file: Game.js ~ line 161 ~ //setTimeout ~ newList",
        newList
      );

      let question = jsonData["question"] + " " + lastQuestion;

      let correctAnswer = jsonData["correctAnswer"] + ", " + lastCorrectAnswer;
      let checkCorrectAnswer =
        lastCorrectAnswer === answer
          ? jsonData["checkCorrectAnswer"] + 1
          : jsonData["checkCorrectAnswer"];
      let currentQuestion = jsonData["currentQuestion"];
      let check = answer < 10 ? "0" + answer : answer;
      let totalCorrectAnswer =
        lastCorrectAnswer === answer
          ? jsonData["totalCorrectAnswer"] + 1
          : jsonData["totalCorrectAnswer"];

      let totalQuestions = jsonData["totalQuestions"] + 1;
      let gameNumber =
        parseInt(jsonData["tour"].slice(2).replace("/", "")) > 8
          ? jsonData["gameNumber"] + 1
          : jsonData["gameNumber"];
      let selectedAnswer =
        lastCorrectAnswer === answer
          ? jsonData["selectedAnswer"] +
            " " +
            lastQuestion.slice(0, 1) +
            " x " +
            lastQuestion.slice(lastQuestion.length - 1, lastQuestion.length) +
            " = " +
            check +
            "   " +
            `\u221A` +
            ","
          : jsonData["selectedAnswer"] +
            " " +
            lastQuestion.slice(0, 1) +
            " x " +
            lastQuestion.slice(lastQuestion.length - 1, lastQuestion.length) +
            " = " +
            check +
            `   ` +
            `x,`;

      let tour =
        checkTrue === true
          ? parseInt(jsonData["tour"].substring(0, 1)) +
            1 +
            "/" +
            (parseInt(jsonData["tour"].substring(3, 1).replace("/", "")) + 1)
          : parseInt(jsonData["tour"].substring(0, 1)) +
            "/" +
            (parseInt(jsonData["tour"].substring(3, 1).replace("/", "")) + 1);

      const newItem = {
        question: question,
        point: point,
        currentQuestion: currentQuestion,
        correctAnswer: correctAnswer,
        checkCorrectAnswer: checkCorrectAnswer,
        selectedAnswer: selectedAnswer,
        tour: tour,
        totalCorrectAnswer: totalCorrectAnswer,
        totalQuestions: totalQuestions,
        gameNumber: gameNumber,
      };

      setPointN(newItem["point"]);
      setTourN(tour);
      const data = JSON.stringify(newItem);
      localStorage.clear();
      localStorage.setItem("items", data);
      setPrimaryRN(newList[0]);
      setSecondaryRN(newList[1]);
      setTertiaryRN(newList[2]);

      if (parseInt(jsonData["tour"].slice(2).replace("/", "")) > 8) {
        return navigate("/ResultPage");
      }
    }, 3000);
  }
  useEffect(() => {
    let gameObject = {};
    let numberForQuestion = randomN(2, 9);
    let numberForQuestion2 = randomN(2, 9);

    gameObject = {
      question: `${numberForQuestion} * ${numberForQuestion2}`,
      numberForQuestion: (numberForQuestion - 1) * numberForQuestion2,
      numberForQuestion2: (numberForQuestion + 1) * numberForQuestion2,
      numberForQuestion3: numberForQuestion * numberForQuestion2,
      correctAnswerForQuestion: numberForQuestion * numberForQuestion2,
    };
    setLastQuestion(gameObject.question);
    setLastCorrectAnswer(gameObject.correctAnswerForQuestion);

    let list = [];
    let final = 0;
    let index = 0;
    while (final === 0) {
      let randomNumer = randomN(0, 2);
      if (
        list[0] !== randomNumer &&
        list[1] !== randomNumer &&
        list[2] !== randomNumer
      ) {
        list[index] = randomNumer;
        if (index !== 2) {
          index++;
        } else {
          final = 1;
        }
      }
    }
    let newList = [];
    newList[list[0]] = gameObject.numberForQuestion;
    newList[list[1]] = gameObject.numberForQuestion2;
    newList[list[2]] = gameObject.numberForQuestion3;
    setPrimaryRN(newList[0]);
    setSecondaryRN(newList[1]);
    setTertiaryRN(newList[2]);

    setBgColor("#2d2d2d");
    setTrueBtnClass("none-game enable");
    setTrueBtnClass1("none-game enable");
    setTrueBtnClass2("none-game enable");
    setTrueCircleClass("none-circle enable");
    setTrueCircleClass1("none-circle enable");
    setTrueCircleClass2("none-circle enable");
  }, []);

  return (
    <>
      <svg
        width={props.width || "1606"}
        height={props.height || "944"}
        viewBox="0 0 1920 1080"
        style={{ backgroundColor: bgColor }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <svg
          width="948"
          height="944"
          viewBox="0 0 948 944"
          x="125"
          y="125"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M226.798 80.4484C223.542 82.7825 217.239 86.3304 218.076 81.8489C219.122 76.247 237.962 3.77202 240.753 2.02142C243.544 0.270819 246.683 -1.47978 249.125 2.02142C251.568 5.52263 273.547 79.0479 270.756 80.4484C267.965 81.8489 262.731 83.2494 261.685 81.8489C260.848 80.7285 249.707 38.9008 244.241 18.127L226.798 80.4484ZM565.013 173.65C510.634 65.5188 622.679 16.9839 684.013 18.6506C690.013 15.4506 680.179 13.6506 674.513 13.1505C626.346 9.81722 541.013 41.6505 541.013 118.651C541.013 229.151 648.513 244.151 673.513 246.651L673.57 246.656C675.923 259.407 678.848 276.102 681.846 294.534C675.779 301.715 669.217 309.754 662.327 318.194L662.325 318.198C621.362 368.38 568.834 432.731 540.013 415.151C490.013 384.651 467.013 290.151 467.013 241.651L466.896 241.569C459.588 205.687 441.363 211.094 432.267 213.792C429.393 214.644 427.431 215.227 427.013 214.151C420.628 197.734 416.513 187.151 409.513 159.151C404.846 158.317 395.613 157.751 396.013 162.151C396.413 166.551 409.846 204.651 416.513 223.151C408.179 229.817 393.813 250.551 401.013 260.151C409.84 271.921 420.592 283.21 454.026 286.469C462.433 336.688 501.389 401.527 509.013 409.151C532.882 433.02 580.985 450.954 684.31 309.981C691.329 354.901 698.013 406.02 698.013 435.151C698.013 456.002 697.224 478.629 696.504 499.264V499.265V499.266L696.504 499.268L696.504 499.273V499.275V499.276V499.278C695.491 528.305 694.616 553.388 696.269 564.039C685.303 595.292 658.383 673.835 648.513 719.151C635.988 776.651 665.513 903.651 665.513 903.651C665.513 903.651 651.513 881.151 617.013 871.151C582.513 861.151 545.513 909.151 595.513 929.651C645.513 950.151 667.917 943.26 665.513 937.651C664.013 934.151 659.513 934.151 659.513 934.151C659.513 934.151 570.013 928.651 586.513 890.651C603.013 852.651 665.513 919.151 671.013 926.651C676.513 934.151 686.513 931.151 684.013 921.651C683.893 921.195 683.699 920.48 683.441 919.525L683.437 919.511C678.305 900.537 647.735 787.522 659.513 735.651C669.417 692.03 694.216 615.096 703.722 586.121C703.925 586.693 704.139 587.263 704.365 587.829C729.62 651.056 738.7 687.149 745.974 716.067C757.932 763.599 765.013 791.748 831.031 889.15C817.723 883.155 796.173 874.348 782.013 871.651C761.013 867.651 729.013 884.651 733.013 914.651C736.213 938.651 758.013 942.651 768.513 941.651C790.884 933.341 835.991 915.686 844.608 908.956L844.866 909.328L853.866 904.828C781.701 800.024 769.431 753.681 754.983 699.107L754.982 699.106C745.722 664.129 735.567 625.771 708.175 566.475C708.396 565.474 708.513 564.358 708.513 563.151C708.513 562.7 708.577 561.303 708.682 559.045L708.683 559.021C709.799 534.993 715.416 414.03 695.96 298.508C710.209 300.781 740.522 320.966 758.513 341.151C771.411 355.622 781.306 372.34 789.919 386.89L789.92 386.892L789.92 386.892C801.89 407.115 811.382 423.151 823.013 423.151C858.929 423.151 886.544 372.543 907.225 334.644L907.228 334.639C910.869 327.967 914.294 321.689 917.513 316.151C957.013 296.151 948.846 272.484 941.013 261.151C935.179 251.151 916.413 236.151 888.013 256.151C859.613 276.151 885.346 305.817 901.513 318.151C901.513 318.151 856.013 411.291 834.013 413.651C833.641 413.69 833.275 413.735 832.912 413.779L832.911 413.78C824.672 414.786 817.996 415.602 781.601 355.264C752.849 307.596 715.491 292.149 694.463 289.909C694.178 288.325 693.888 286.742 693.593 285.16C693.583 285.086 693.571 285.014 693.556 284.946C693.551 284.921 693.546 284.897 693.54 284.874C691.161 272.146 688.461 259.535 685.399 247.179C735.785 246.98 827.032 218.995 815.513 123.151C803.013 19.1505 699.513 4.24669 666.513 6.15055C645.713 7.35056 650.513 11.3172 655.513 13.1505C764.513 2.65054 805.013 92.1505 805.013 137.651C805.013 263.151 608.513 260.151 565.013 173.65ZM814.941 893.355C825.776 898.636 835.387 903.32 841.156 903.959C841.527 904.497 841.899 905.038 842.274 905.58C840.073 906.25 837.524 907.263 835.513 908.151C834.915 908.482 834.308 908.818 833.694 909.159L832.614 909.76L831.753 910.238C808.614 923.098 775.58 941.458 762.513 935.651C733.013 922.539 745.013 876.151 770.013 877.151C782.74 877.66 800.004 886.074 814.941 893.355ZM936.513 281.651C936.513 292.144 925.32 309.651 911.513 309.651C897.705 309.651 886.513 292.144 886.513 281.651C886.513 271.157 901.705 256.651 915.513 256.651C929.32 256.651 936.513 271.157 936.513 281.651ZM440.513 225.651C441.349 227.184 442.095 228.266 442.752 229.069C446.885 237.89 450.105 252.755 452.855 277.704C432.255 271.934 403.546 255.622 419.513 236.151C421.394 233.856 422.007 237.67 422.685 241.894C423.338 245.955 424.052 250.396 426.013 250.151C429.213 249.751 434.679 247.317 437.013 246.151L431.013 225.651C430.513 222.984 437.513 220.151 440.513 225.651ZM723.949 116.794C727.102 112.797 725.663 98.6344 724.549 92.0529C727.109 89.5687 732.678 85.856 734.48 90.8792C736.733 97.1582 733.298 119.214 730.932 120.5C728.567 121.787 720.008 121.791 723.949 116.794ZM659.792 91.2707C660.126 97.9373 659.892 112.171 656.292 115.771C651.792 120.271 660.292 121.271 662.792 120.271C665.292 119.271 671.292 97.7707 669.792 91.2707C668.592 86.0707 662.626 89.104 659.792 91.2707ZM702.792 163.271C688.626 162.271 655.508 165.818 662.292 181.271C671.292 201.771 708.292 193.771 707.292 188.771C706.917 186.893 701.98 186.496 696.032 186.018C686.14 185.222 673.449 184.202 674.292 175.771C674.788 170.809 683.901 170.032 691.919 169.349C700.061 168.655 707.075 168.057 702.792 163.271ZM18.166 116.887H441.911V110.887L8.41147 109.07C2.01859 109.488 -0.450877 112.046 0.0666547 114.178L13.4677 519.794C13.6399 519.868 13.8104 519.94 13.9791 520.01C14.419 523.615 17.0229 527.203 22.3246 527.887L580.411 453.387V441.543L31.1999 511.392L18.166 116.887ZM173.604 528.305L185.237 529.312L151.879 914.871L140.245 913.865L173.604 528.305ZM368.259 504.887L356.911 507.643L448.247 883.71L459.595 880.954L368.259 504.887Z"
            fill="white"
          />
        </svg>
        <svg x="120" y="120">
          <path
            d="M1060.68 350.733C1020.62 270.927 1103.18 235.107 1148.37 236.337C1152.79 233.975 1145.55 232.646 1141.37 232.277C1105.88 229.817 1043 253.311 1043 310.141C1043 391.694 1122.21 402.764 1140.63 404.61C1174.53 408.005 1254.48 390.218 1245.27 313.462C1236.06 236.706 1159.79 225.706 1135.48 227.111C1120.15 227.997 1123.69 230.924 1127.37 232.277C1207.69 224.528 1237.53 290.582 1237.53 324.163C1237.53 416.787 1092.74 414.573 1060.68 350.733Z"
            className={trueCircleClass}
          />
        </svg>
        <svg x="120" y="120">
          <path
            x="1080"
            d="M1420.68 483.733C1380.62 403.927 1463.18 368.107 1508.37 369.337C1512.79 366.975 1505.55 365.646 1501.37 365.277C1465.88 362.817 1403 386.311 1403 443.141C1403 524.694 1482.21 535.764 1500.63 537.61C1534.53 541.005 1614.48 523.218 1605.27 446.462C1596.06 369.706 1519.79 358.706 1495.48 360.111C1480.15 360.997 1483.69 363.924 1487.37 365.277C1567.69 357.528 1597.53 423.582 1597.53 457.163C1597.53 549.787 1452.74 547.573 1420.68 483.733Z"
            className={trueCircleClass2}
          />
        </svg>
        <svg x="120" y="120">
          <path
            d="M1139.68 642.733C1099.62 562.927 1182.18 527.107 1227.37 528.337C1231.79 525.975 1224.55 524.646 1220.37 524.277C1184.88 521.817 1122 545.311 1122 602.141C1122 683.694 1201.21 694.764 1219.63 696.61C1253.53 700.005 1333.48 682.218 1324.27 605.462C1315.06 528.706 1238.79 517.706 1214.48 519.111C1199.15 519.997 1202.69 522.924 1206.37 524.277C1286.69 516.528 1316.53 582.582 1316.53 616.163C1316.53 708.787 1171.74 706.573 1139.68 642.733Z"
            className={trueCircleClass1}
          />
        </svg>

        <text x="220" y="470" fill="#fff" style={{ fontSize: 128 }}>
          {lastQuestion}
        </text>
        <text
          x="1200"
          y="480"
          className={trueBtnClass}
          onClick={() => database(primaryRN)}
        >
          {primaryRN <= 9 ? "0" + primaryRN : primaryRN}
        </text>
        <text
          x="1560"
          y="610"
          className={trueBtnClass2}
          onClick={() => database(secondaryRN)}
        >
          {secondaryRN <= 9 ? "0" + secondaryRN : secondaryRN}
        </text>

        <text
          x="1280"
          y="770"
          className={trueBtnClass1}
          onClick={() => database(tertiaryRN)}
        >
          {tertiaryRN <= 9 ? "0" + tertiaryRN : tertiaryRN}
        </text>
        <text x="1080" y="80" fill="#fff" style={{ fontSize: 48 }}>
          Score: {pointN}
        </text>
        <text x="1360" y="80" fill="#fff" style={{ fontSize: 48 }}>
          Tour: {JSON.parse(localStorage.getItem("items"))["gameNumber"] + 1}
        </text>
        <text x="1600" y="80" fill="#fff" style={{ fontSize: 48 }}>
          Questions:{tourN}
        </text>
      </svg>
    </>
  );
};

export default GameCanvas;
