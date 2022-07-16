import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
function App() {
  //Rooter yapısı oluşturuluyor
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Kodluyoruz-Task3" element={<MainPage />} />
        <Route path="/GamePage" element={<GamePage />} />
        <Route path="/ResultPage" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
