import React, { Component } from 'react'
import {PersonalDetailsUpdateForm, Title} from '@pages/user_Info_update/components/index.js'

class UserInfoUpdate extends Component {

    render() {

    const title = "Update details"

      return (

          <>   
             <Title/>
             <PersonalDetailsUpdateForm/>
          </>

      )

    }

}

export default UserInfoUpdate