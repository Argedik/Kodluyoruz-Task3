import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
// const HomePage = () => <div>HomePage</div>;

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/GamePage" element={<GamePage />} />
        <Route path="/ResultPage" element={<ResultPage />} />
        {/* <Route path="/home" element={<MainPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
