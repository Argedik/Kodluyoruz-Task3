import React from "react";
import { CircleR } from "./Circle";
import { DividerL, DividerS } from "./Dividers";
import "../App.css";
const Result = (props) => {
  //Sonuç sayfası
  const list = Array(10).fill("");
  let y = 240;
  const x = 1220;
  const jsonData = JSON.parse(localStorage.getItem("items"));
  let checkCorrectAnswer = jsonData["checkCorrectAnswer"];
  let checkTotalQuestion = jsonData["tour"].slice(2);
  console.log("🚀 ~ Result ~ checkTotalQuestion", checkTotalQuestion);

  let listIndex = -5;
  let text = jsonData["selectedAnswer"];
  let arr = text.replace("undefined", "").split(",");
  let trimmingArr = arr.map(function (value, index, arr) {
    return value.trim();
  });
  return (
    <>
      {/* <svg
        width={props.width || "1606"}
        height={props.height || "944"}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      ></svg> */}
      <svg
        width={props.width || "1606"}
        height={props.height || "944"}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="520" y="190" fontSize="82" fill="#FF0000">
          Final
        </text>
        <DividerS x="510" y="220" />
        <text x="480" y="370" fontSize="64" fill="#fff">
          Point: {jsonData["point"]}
        </text>
        <text x="420" y="510" fontSize="64" fill="#fff">
          Questions: {jsonData["tour"].slice(2).replace("/", "")}
        </text>
        <text x="360" y="660" fontSize="64" fill="#fff">
          Correct Answers: {checkCorrectAnswer}
        </text>
        <CircleR x="420" y="760" nav={"/"}></CircleR>
        <text x="1200" y="190" fontSize="64" fill="#FF0000">
          All Question
        </text>
        <DividerL x="1190" y="220" />

        {list.map((i, key) => (
          <React.Fragment key={key}>
            {`${(y = y + 80)} ${(listIndex += 6)}`}
            <text x={x} y={y} fontSize="64" fill="#fff" key={key}>
              {trimmingArr[key]}
            </text>
          </React.Fragment>
        ))}
      </svg>
    </>
  );
};

export default Result;
