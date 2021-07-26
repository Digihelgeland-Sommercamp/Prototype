
import './App.css';
import MainPage from './components/MainPage.js';
import Login from './components/Login.js';
import React, { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import OverviewApplication from './pages/OverviewApplication/OverviewApplication';
import Situation from './pages/Situation/Situation';
import OverviewApplications from './pages/OverviewApplications/OverviewApplications';



const page = atom({
  key: "page",
  default: 0
});

const lastPage = atom({
  key: "lastPage",
  default: 0
})

const situation = atom({
  key: "situation",
  default: ""
})

const overviewOfApplication = atom({
  key: "overviewOfApplication",
  default: {}
})

function App() {
  
  return (
    <RecoilRoot>
      <Router />  
    </RecoilRoot>
  );

}

function Router() {
  const [state, setState] = useRecoilState(page);
  const currentSituaton = useRecoilValue(situation)
  
  console.log(currentSituaton);

  switch(state){
    case 0 :
      return <Login />
    case 1 :
      return <Situation />
    case 2 : 
      return <OverviewApplications />
    case 3 : 
      return <OverviewApplication />
    default:
      return (
        <div className="App">

          <button onClick={() => setState(1)}>Logg inn</button>
        </div>
      );
  }

}

export default App;
