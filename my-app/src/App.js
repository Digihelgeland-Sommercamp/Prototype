
import './App.css';
import React from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// Pages
import ApplicationPage from './components/applicationPage/ApplicationPage';
import Login from './pages/Login/Login.js';
import OverviewApplication from './pages/OverviewApplication/OverviewApplication';
import Situation from './pages/Situation/Situation';
import OverviewApplications from './pages/OverviewApplications/OverviewApplications';
import Income from './pages/Income/Income';
import Kids from './pages/Kids/Kids';
import AddPartnerPage from './components/addPartnerPage/AddPartnerPage';



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
      return <Kids />
    case 3 : 
      return <Income />
    case 4 :  
      return <OverviewApplications />
    case 5 : 
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
