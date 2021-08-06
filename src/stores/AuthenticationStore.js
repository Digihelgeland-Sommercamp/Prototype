import Oidc from 'oidc-client';



class AuthenticationStore {
    manager = null;
    user = null;
 
    constructor() {
       let config =  {
          authority: "https://oidc-test1.difi.eon.no/idporten-oidc-provider",
          client_id: "oidc_helgeland_camp",
          redirect_uri: "http://localhost:8080",
          //post_logout_redirect_uri: "https://www.digdir.no/",
          response_type: "code",
          scope: "openid",
          acr_values: "Level3",
          state: "6d8b92f8-2f2d-4918-a9a3-320b1943051f",
          //ui_locales: "nb",
          loadUserInfo: false,
          revokeAccessTokenOnSignout: true
       };
       this.manager = new Oidc.UserManager(config);
    }
 
    
    get isLoggedIn() {
       return this.user != null && this.user.access_token && !this.user.expired;
    }


    getToken() {
       try{
         console.log(this.user.access_token);
       }catch{
          console.log("No token found");
       }
    }
 
    
    loadUser() {
       this.manager.getUser()
          .then( (user) => this.user = user);
    }
 
    
    login() {
       this.manager.signinRedirect()
          .catch((error) => this.handleError(error));
    }
 
    
    completeLogin() {
       this.manager.signinRedirectCallback()
          .then(user => this.user = user)
          .catch((error) => this.handleError(error));
    }
 
    
    logout() {
       this.manager.signoutRedirect()
          .catch((error) => this.handleError(error));
    }
 
    
    completeLogout() {
       this.manager.signoutRedirectCallback()
          .then(() => {this.manager.removeUser()})
          .then(() => {this.user = null;})
          .catch((error) => this.handleError(error));
    }
 
    
    handleError(error) {
       console.error("Problem with authentication endpoint: ", error);
    }
 
 }

 export default AuthenticationStore;