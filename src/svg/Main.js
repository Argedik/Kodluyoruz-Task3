import React, { useEffect } from "react";
import "../App.css";
import { CircleS } from "./Circle";
import { DividerXL } from "./Dividers";
const MainCanvas = (props) => {
  //giriş sayfasında verilerin localstorage'dan çekilmesi yada hiç veri yoksa ortamın oluşturulması
  let jsonData =
    localStorage.length > 0 && JSON.parse(localStorage.getItem("items"));
  let score = localStorage.length > 0 && jsonData["point"];
  console.log("🚀 ~ MainCanvas ~ jsonData", jsonData);

  let CorrectAnswer =
    localStorage.length > 0 &&
    jsonData["checkCorrectAnswer"] + jsonData["totalCorrectAnswer"];
  let totalQuestions = localStorage.length > 0 && jsonData["totalQuestions"];

  useEffect(() => {
    let question = "";
    let point = 0;
    let checkCorrectAnswer = 0;
    let correctAnswer = "";
    let tour = 0 + "/" + 0;
    let totalCorrectAnswer = 0;
    let totalQuestions = 0;
    let gameNumber = 0;

    const newItem = {
      question: question,
      point: point,
      checkCorrectAnswer: checkCorrectAnswer,
      correctAnswer: correctAnswer,
      tour: tour,
      totalCorrectAnswer: totalCorrectAnswer,
      totalQuestions: totalQuestions,
      gameNumber: gameNumber,
    };

    const data = JSON.stringify(newItem);
    console.log("🚀 ~ useEffect ~ localStorage.length", localStorage.length);

    if (localStorage.length === 0) {
      console.log("testtttttttttttttttt");
      localStorage.setItem("items", data);
    }
  });
  return (
    <>
      <svg
        width={props.width || "1606"}
        height={props.height || "944"}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="600" y="150" fontSize="82" fill="#FF0000">
          Mathematics Game
        </text>
        <DividerXL x="610" y="170" />
        <text x="720" y="300" fontSize="64" fill="#FFF">
          Total Score: {score}
        </text>
        <text x="670" y="430" fontSize="64" fill="#FFF">
          Total Questions: {totalQuestions}
        </text>
        <text x="670" y="560" fontSize="64" fill="#FFF">
          Correct Answers: {CorrectAnswer}
        </text>
        <CircleS x="700" y="660" nav={"/GamePage"} />
      </svg>
    </>
  );
};

export default MainCanvas;
