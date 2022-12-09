import React, {useEffect} from 'react';
import Artists from "./components/Artists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import NavBar from "./components/UI/NavBar";
import {useAppDispatch} from "./hooks/redux";
import {musicSlice} from "./store/reducers/MusicSlice";

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const localUserInfo = localStorage.getItem('user')
    if (localUserInfo) {
      const parsedUserInfo = JSON.parse(localUserInfo)
      if ('username' in parsedUserInfo && 'token' in parsedUserInfo) {
        dispatch(musicSlice.actions.setUsername(parsedUserInfo.username))
        dispatch(musicSlice.actions.setToken(parsedUserInfo.token))
      }
    }
  }, [])
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