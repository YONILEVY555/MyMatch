
import React, { Component } from 'react'
import {JPA_API_URL} from "@utils/constants/Url.js"
import { Button } from 'react-bootstrap'
import {UserDataService,UriDataService} from '@api/index.js'
import {User} from '@components/User.js'

class Test extends Component {

    constructor(props){
        super(props)

    }

    btnClick = async () => {

        let i;

        //for( i=0; i<1 ; i++ ){
            let user = new User() 
            //if(i===0){ 
                user.phone = "0546761968" 
                user.gender = "FEMALE"
            //}      
            UserDataService.createUser(user)
        //}
    }

    getUser = async () => {

        await UserDataService.createBlocked(1,{
            "sourceId": 6,
            "targetId": 8
           });
      
    }

    upload = async () => {

        await UserDataService.uploadImage(1);
      
    }

    render() {

     

        return (

            <>

              <Button className="mt-5" onClick={this.btnClick}>Click me</Button>
              <Button className="mt-5 d-block " onClick={this.getUser}>get user</Button>
              <Button className="mt-5 d-block " onClick={this.upload}>upload</Button>
            </>

        )
    }

}

export default Test