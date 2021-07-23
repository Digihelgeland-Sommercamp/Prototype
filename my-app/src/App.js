
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



// const page = atom({
//   key: "page",
//   default: 0
// });



function App() {


  return (
      <OverviewApplication title="Redusert foreldrebetaling"/>
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
