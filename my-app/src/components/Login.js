import "./Login.css"


  
  var fodselsnummer = "";
  var password = "";

  function loginfunction() {
    if(fodselsnummer === "") {
      document.getElementById("fodselsnummer").style.borderColor = "red";
    }else{
      document.getElementById("fodselsnummer").style.borderColor = "green";
    }

    if(password === "") {
      document.getElementById("password").style.borderColor = "red";
    }else{
      document.getElementById("password").style.borderColor = "green";
    }
  }

  function Login() {
     
    


    return (
      <div className="Login">
        
        <div className="inputText">
        <p className="label">FØDSELSNUMMER:</p>
          <input id="fodselsnummer" type="text" required="required" onChange={(event) => fodselsnummer = event.target.value}></input>
        </div>
        <div>
        <p className="label">PASSORD: </p>
          <input id="password" type="password" onChange={(event) => password = event.target.value}></input>
        </div>
        <div id="buttons">
          <button id="cancel">AVBRYT</button><button id="login" onClick={loginfunction}>LOGG INN</button>
        </div>
      </div>
    );
  }
  
  export default Login;

