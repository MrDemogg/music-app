import React from 'react';
import Artists from "./components/Artists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import NavBar from "./components/UI/NavBar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div style={{marginTop: 60}}>
          <Routes>
            <Route index element={<Artists />} />
            <Route path={'/artists'} element={<Artists />} />
            <Route path={'/albums/:artist'} element={<Albums />} />
            <Route path={'/albums'} element={<Albums />} />
            <Route path={'/tracks/:album'} element={<Tracks />} />
            <Route path={'/tracks'} element={<Tracks />} />
            <Route path={'*'} element={<Artists />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;