import "./Login.css"
const axios = require('axios');


  
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

  const config = {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
      //'Authorization' : 'Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ='
    }
  }

  function sokfunction() {
    window.location.replace("https://oidc-test1.difi.eon.no/idporten-oidc-provider/authorize?scope=openid%20profile&acr_values=Level3&client_id=oidc_helgeland_camp&response_type=code&state=6d8b92f8-2f2d-4918-a9a3-320b1943051f&nonce=5b6edfb9-b50b-4d0a-9aa09d261132aca4&redirect_uri=http%3A%2F%2Flocalhost%3A8080&code_challenge_method=S256&code_challenge=NTM5NDNiZjlhN2UzNTAxZmQ2ZmRiOTBmNzQyODY1OGY1OGMwMjI3ZjNjZDliNTUxYzFiYTgwNDhmYTIwODQzZg%3D%3D");
  }

  function Login() {
     
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    const getToken = (body) => {
      
      axios.post("https://oidc-test1.difi.eon.no/idporten-oidc-provider/token", body, config).then((respons) => console.log(respons));
    }

    const body = new URLSearchParams();
    try{
      body.append("client_id", "oidc_helgeland_camp");
      body.append("grant_type", "authorization_cde");
      body.append("redirect_uri", "http%3A%2F%2Flocalhost%3A8080");
      body.append("code", params.get("code"));
      //body.append("code_verifier", "NTM5NDNiZjlhN2UzNTAxZmQ2ZmRiOTBmNzQyODY1OGY1OGMwMjI3ZjNjZDliNTUxYzFiYTgwNDhmYTIwODQzZg%3D%3D");
      getToken(body);
    }
    catch(e){
      console.log(e);
    }

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
        <div id="buttons">
          <button id="login" onClick={sokfunction}>SØK</button>
        </div>
      </div>
    );
  }
  
  export default Login;

