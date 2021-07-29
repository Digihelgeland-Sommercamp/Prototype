
import './App.css';
import React from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { PAGE_POINTER } from './pagePointer';

// Pages
import ApplicationPage from './components/applicationPage/ApplicationPage';
import Login from './pages/Login/Login.js';
import OverviewApplication from './pages/OverviewApplication/OverviewApplication';
import Situation from './pages/Situation/Situation';
import OverviewApplications from './pages/OverviewApplications/OverviewApplications';
import Income from './pages/Income/Income';
import Kids from './pages/Kids/Kids';
import AddPartnerPage from './components/addPartnerPage/AddPartnerPage';
import Household from './pages/Household/Household';



const page = atom({
  key: "page",
  default: PAGE_POINTER.login
});
const lastPage = atom({
  key: "lastPage",
  default: 0
})

const situation = atom({
  key: "situation",
  default: ""
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
    case PAGE_POINTER.login :
      return <Login />
    case PAGE_POINTER.situation :
      return <Situation />
    case PAGE_POINTER.household : 
      return <Household />
    case PAGE_POINTER.kids : 
      return <Kids />
    case PAGE_POINTER.income : 
      return <Income />
    case PAGE_POINTER.allApplications :  
      return <OverviewApplications />
    case PAGE_POINTER.applicationOverview : 
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
