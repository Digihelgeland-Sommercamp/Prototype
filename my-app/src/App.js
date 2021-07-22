
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
import TitleWithChildren from './components/TitleWithChildren/TitleWithChildren';
import IntrodctionRadioButtons from './components/IntroductionRadioButtons/IntroductionRadioButtons';



// const page = atom({
//   key: "page",
//   default: 0
// });



function App() {

  const people = [
    {
      name: "Karl",
      id: "250789 78388",
    },
    {
      name: "Boris",
      id: "250789 78388",
    },
    {
      name: "Johnson",
      id: "250789 78388",
    }
  ]
  const people2 = [
    {
      name: "Fred",
      id: "250789 78388",
      extraInformation: "Salhus SFO"
    },
    {
      name: "Bernt",
      id: "250789 78388",
      extraInformation: "Salhus BHG"
    },
    {
      name: "Hans",
      id: "250789 78388",
      extraInformation: "Salhus SFO"
    }
  ]
  
  return (
      <>
        <MainPage />
        <IntrodctionRadioButtons />
        <TitleWithChildren title="Husholdning" people={people}  />
        <TitleWithChildren title="Søker for" people={people2}  />
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
