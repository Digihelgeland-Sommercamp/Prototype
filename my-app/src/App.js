
import './App.css';
import MainPage from './components/MainPage.js';
import Login from './components/Login.js';
import ApplicationPage from './components/applicationPage/ApplicationPage';
import React, { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {


  return (
      <ApplicationPage />
    );
}


export default App;
