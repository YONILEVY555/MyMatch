import React, { Component } from 'react'
import {Image, Button} from "react-bootstrap"
import SubNavbar from "@components/SubNavbar.js";
import UserDataService from "@api/user/UserDataService";
import AuthenticationService from "@services/AuthenticationService.js"
import {Color} from '@utils/constants/Color.js'

class FindFriends extends Component {

  constructor(props){

    super(props)
        this.state = {
           id: AuthenticationService.getLoggedInUserId(),
           search: '',
           searchResult: null,
           showResult: false,
           imageResult: '',
           idResult: '',
           usernameResult: '',
           isNotExist: false, 
           isRequestSent: false,
           isRequestReceived: false,
           isAlreadyFriend: false
        }
  }

  handleChange = async (event) => {

    var requestParam = {
      params: {
          type: 'F' 
      }
    }

    let searchResult
    
    try{

        if(event.target.value === ''){
              this.userNotFound(event)
              return
        }
  
        searchResult = await UserDataService.retrieveUser(event.target.value)
         
        const relationShip = await UserDataService.getRelationship(this.state.id ,searchResult.data.id,requestParam)
         
        const stateRelationship = this.getStateRelationShip(relationShip.data)

        this.existRelationshipWithUser(stateRelationship, event, searchResult)

  }
  catch(e){
              
        if(e.response.status === 404){

          const searchResult = await UserDataService.retrieveUser(event.target.value)

          this.noRelationshipWithUser(event, searchResult)

        }

         if(e.response.status === 400 || e.response.status === 500){
             this.userNotFound(event)
         }

  }

  }


  userNotFound = (event) =>{
    this.setState({
      search : event.target.value,
      showResult: false,
    })
  }

  noRelationshipWithUser = (event, searchResult) =>{

    const state = this.getCustomState(event, searchResult, true, false, false, false, true)

    this.setState(state)

  }

  existRelationshipWithUser = (stateRelationship, event, searchResult) =>{
    
      let state 

      if( stateRelationship === "ALREADY FRIENDS" ){
         state = this.getCustomState(event, searchResult, true, true, false, false, false)
      }
    
       if( stateRelationship === "ALREADY SENT A REQUEST" ){
         state = this.getCustomState(event, searchResult, true, false, true, false, false)
      }
      
       if( stateRelationship === "ALREADY RECEIVED A REQUEST" ){
         state = this.getCustomState(event, searchResult, true, false, false, true, false)
      }
    
       this.setState(state)

  }

  getCustomState = ( event, searchResult, showResult, isAlreadyFriend, isRequestSent, isRequestReceived, isNotExist) =>{

    const state = { 
      search : null,
      searchResult : null,
      showResult:  null,
      imageResult:  null,
      idResult:  null,
      usernameResult:  null,
      isAlreadyFriend:  null,
      isRequestSent:  null,
      isRequestReceived:  null,
      isNotExist:  null
    } 

    this.setCustomState(state, event, searchResult, showResult, isAlreadyFriend, isRequestSent, isRequestReceived, isNotExist)

    return state

  }

  setCustomState = (state,event,searchResult,showResult,isAlreadyFriend,isRequestSent,isRequestReceived,isNotExist) =>{

      state.search = event.target.value
      state.searchResult = searchResult.data
      state.showResult = showResult
      state.imageResult = searchResult.data.image[0].content
      state.idResult = searchResult.data.id
      state.usernameResult = searchResult.data.username
      state.isAlreadyFriend = isAlreadyFriend
      state.isRequestSent = isRequestSent
      state.isRequestReceived = isRequestReceived
      state.isNotExist = isNotExist

  }

  AddFriendClick = async (friendId) =>{

    var requestParam = {
      params: {
          userId: Number(this.state.id) ,
          otherId: friendId,
          type: 'FRIEND',
          status: '' 
      }
    }

    const state = {  isRequestSent: false,
                     isRequestReceived: false ,
                     isNotExist: false,
                     isAlreadyFriend: false
                  }
                 
    if(this.state.isRequestReceived){
      requestParam.params.status = 'ACTIVE'
      state.isAlreadyFriend = true
      await UserDataService.updateRelationship(this.state.id,requestParam);
      this.setState(state)
    }else{
      if(this.state.isNotExist)  
         requestParam.params.status = 'STANDBY'
         state.isRequestSent = true
         await UserDataService.createRelationship(this.state.id,requestParam);
         this.setState(state)
    }

  }
 

  cancelRequestClick = async (friendId) =>{

    var requestParam = {
      params: {
        userId: Number(this.state.id) ,
        otherId: Number(friendId), 
    }
  }

    await UserDataService.deleteRelationship(this.state.id,requestParam);

    this.setState({  isRequestSent: false,
                     isNotExist: true,
    })

  }

  getStateRelationShip = (relationShip) =>{

    if(relationShip != ''){
         if( relationShip.status === "STANDBY" ){
             if( relationShip.source.id == this.state.id){
                return "ALREADY SENT A REQUEST"
             }
              else{
                return "ALREADY RECEIVED A REQUEST"
              }     
         }else{
              return "ALREADY FRIENDS"
         }
      }else{
            return "ALREADY FRIENDS"
      }
  }

    render() {

        const title = "Find new friends"
        const btnText = "My friends"

        return (

            <div className="mx-auto">

                        <SubNavbar handleChange={this.handleChange} 
                                   valSerach={this.state.valSerach}
                                   btnText={btnText}
                                   title={title}/>

                        {this.state.showResult && <div className='w-50 mx-auto'>

                                                 <Image src={`data:image/jpeg;base64,${this.state.imageResult}`} 
                                                        className=" size-image-find-Friends mt-3 mb-3 d-block mx-auto" />  
   
                                                 <div className=' w-25 mx-auto'>{this.state.usernameResult}</div>
   
                                                 <div className=' w-25  mx-auto'>
                                                      
                                                       { ( this.state.isNotExist || this.state.isRequestReceived )  && <Button onClick={e => this.AddFriendClick(e.target.id)}  
                                                                                                                               id={this.state.idResult} 
                                                                                                                               className=' w-100 c1 mt-4  mx-auto'
                                                                                                                               style={{background: Color.BLUE, border: Color.BLUE  }}>Add Friend</Button>}

                                                       {this.state.isRequestSent && <p class="text-muted mx-auto mt-4">Request sent</p>}

                                                       { this.state.isRequestSent && <Button onClick={e => this.cancelRequestClick(e.target.id)}  
                                                                                             id={this.state.idResult} 
                                                                                             className='btn btn-secondary w-100 c1 mx-auto'>Cancel request</Button>}

                                                       {this.state.isAlreadyFriend && <p class="text-muted mx-auto mt-4">You are already friends</p>}


   
                                                 </div>

                                            </div> }
            </div>

        )
    }
}

export default FindFriends