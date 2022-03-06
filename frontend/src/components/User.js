import moment from 'moment'
import PasswordHelpers from '@utils/helpers/PasswordHelpers.js'

 export class User {

    constructor() {

        const empty = "";

        this.id = 0;
        this.username =  empty ;
        this.gender =  empty;
        this.date = moment(new Date()).format('YYYY-MM-DD');;
        this.phone =  empty;
        this.email =  empty;
        this.description = empty;
        this.hashpassword = empty;
    }

     copy(Other){
        this.id = Other.id;
        this.username = Other.username ;
        this.gender = Other.gender;
        this.date = moment(Other.date).format('YYYY-MM-DD');
        this.phone = Other.phone;
        this.email = Other.email;
        this.description = Other.description;
        this.hashpassword = PasswordHelpers.hashPassword(Other.password)
    }

  }

 