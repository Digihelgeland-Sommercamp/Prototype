
import './App.css';
import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { PAGE_POINTER } from './pagePointer';

// Pages
import Login from './pages/Login/Login.js';
import OverviewApplication from './pages/OverviewApplication/OverviewApplication';
import Situation from './pages/Situation/Situation';
import Income from './pages/Income/Income';
import Kids from './pages/Kids/Kids';
import Household from './pages/Household/Household';
import ReviewApplication from './pages/ReviewApplication/ReviewApplication';
import Invoice from './pages/Invoice/Invoice';
import Portal from './pages/Portal/Portal';
import Receipt from './pages/Receipt/Reicept'
import { page, situation } from './atoms';


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

  //TODO: Make situation name dynamic
  switch(state){
    case PAGE_POINTER.login :
      return <Login />
    case PAGE_POINTER.situation :
      return <Situation name="Ola"/>
    case PAGE_POINTER.household : 
      return <Household />
    case PAGE_POINTER.kids : 
      return <Kids />
    case PAGE_POINTER.income : 
      return <Income />
    case PAGE_POINTER.portal :  
      return <Portal />
    case PAGE_POINTER.applicationOverview : 
      return <OverviewApplication />
    case PAGE_POINTER.reviewApplication :
      return <ReviewApplication />
    case PAGE_POINTER.invoice: 
      return <Invoice />
    case PAGE_POINTER.receipt:
      return <Receipt />
    default:
      return (
        <div className="App">
          <button onClick={() => setState(PAGE_POINTER.portal)}>Logg inn</button>
        </div>
      );
  }
}


export default App;
