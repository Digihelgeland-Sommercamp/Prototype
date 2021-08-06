import React, { Component } from 'react';
import AuthenticationStore from './../stores/AuthenticationStore';



const authStore = new AuthenticationStore();


function login(){
   authStore.login();
}

function complete() {
   authStore.completeLogin();
}

function status() {
   console.log(authStore.isLoggedIn);
   authStore.getToken();
}



class Login extends Component {
 

   

   render() {
      return (
         <div>
         <span> Login in process – please wait...</span>
         <div id="buttons">
            <button onClick={login}>Login</button>
            <button onClick={complete}>Complete Login</button>
            <button onClick={status}>Status</button>
         </div>
         </div>
      );
   }
}

export default Login;