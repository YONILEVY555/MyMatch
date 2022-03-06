

import PasswordHelpers from '@utils/helpers/PasswordHelpers.js'
import UserDataService from '@api/user/UserDataService.js'

export const USER_NAME_ATTRIBUTE_NAME = "authenticatedUser"

class AuthenticationService{

    async executeAuthenticationService(PhoneOrEmail, password) {

        return new Promise( (resolve, reject) => {
            UserDataService.retrieveUser(PhoneOrEmail)
                .then( (response)=>{
                    const result = PasswordHelpers.comparePassword(password,response.data.hashpassword)
                    const data = response.data 
                    return resolve ({result:result, data: data })
            })
          });
          
    }

    createToken(token) {
        return 'Bearer ' + token
    }

    registerSuccessfulLogin(phonenumber){
        sessionStorage.setItem(USER_NAME_ATTRIBUTE_NAME,phonenumber);
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
         let user = sessionStorage.getItem(USER_NAME_ATTRIBUTE_NAME)
        
        if(user === null) return false

        return true
    }

    getLoggedInUserId(){

        let id = sessionStorage.getItem(USER_NAME_ATTRIBUTE_NAME);
        if(id===null) 
            return '';

         return id;

    }

}

export default new AuthenticationService()