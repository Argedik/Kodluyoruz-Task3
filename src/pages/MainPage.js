import React, { useEffect, useState } from "react";
import useSizing from "../hooks/Sizing";
import "../App.css";
import MainCanvas from "../svg/Main";

const MainPage = () => {
  const [width, height] = useSizing();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const ratio = 1.7;
    if (width / height > ratio) {
      setSize({
        width: height * ratio,
        height: height,
      });
    } else {
      setSize({
        width: width * 1,
        height: (width * 1) / ratio,
      });
    }
  }, [width, height]);
  return (
    <>
      <MainCanvas width={size.width} height={size.height} />
    </>
  );
};

export default MainPage;
