
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



// const page = atom({
//   key: "page",
//   default: 0
// });



function App() {
  
  return (
      <>
        <OverviewApplications />
        {/* <OverviewApplication 
          title="Redusert foreldrebetaling"
          status="Søknad ikke sendt"
          action="Gjenoppta søknad"/> */}
        {/* <Situation name="Ola"/> */}
      </>
    );

  // return (
  //   <RecoilRoot>
  //     <Router />  
  //   </RecoilRoot>
  // );

}

// function Router() {
//   const [state, setState] = useRecoilState(page);

//   switch(state){
//     case 0 :
//       return (
//         <Login />
//       );
//     case 1 :
//       return <MainPage />
//     default:
//       return (
//         <div className="App">

//           <button onClick={() => setState(1)}>Logg inn</button>
//         </div>
//       );
//   }

// }

export default App;
