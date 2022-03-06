import React, {Component} from "react";
import UserDataService from "@api/user/UserDataService";
import AuthenticationService from "@services/AuthenticationService.js"
import GridSystem from '@components/GridSystem.js';
import {Image, Button } from "react-bootstrap"
import SubNavbar from "@components/SubNavbar.js";
import StringHelpers from "@utils/helpers/StringHelpers.js"
import {Color} from '@utils/constants/Color.js'

class ShowFriendRequests extends Component {
  
  constructor(props){
    super(props)
        this.state = {
            id: AuthenticationService.getLoggedInUserId(),
            fullListRequests: null,
            filteredListRequests: null,
            search: '',
            show: false,
            styleMoreActions: null,
            currentBtnId: null
        }
  }

  componentDidMount(){
    this.refresh()
  }

  refresh = async () =>{

    var requestParam = {
        params: {
          type: "F",
          status: "S"
        }
    }

    const res =  await UserDataService.getRelationships(this.state.id,requestParam);

    const listRequestsReceived = this.getRequestsReceived(res.data);

    this.setState({fullListRequests : listRequestsReceived,
                   filteredListRequests: listRequestsReceived })

  }

  getRequestsReceived = (listAllRequests) =>{
       
    const listRequestsReceived = []

    for(let i = 0; i < listAllRequests.length; i++ ){

        if( listAllRequests[i].source.id == this.state.id ){
            listRequestsReceived.push(listAllRequests[i]);
        }

    }

    return listRequestsReceived

  }

  confirmRequestClick = async (friendId) =>{

    var requestParam = {
        params: {
            userId: Number(this.state.id) ,
            otherId: friendId,
            type: 'FRIEND' ,
            status: 'ACTIVE' 
        }
    }

    await UserDataService.updateRelationship(this.state.id,requestParam);

    this.refresh()

  }

  blockClick = async () => {
        
    var requestParam = {
        params: {
            userId: Number(this.state.id),
            otherId: this.state.currentBtnId,
            type: 'BLOCK',
            status: 'ACTIVE' 
        }
    }

    await UserDataService.updateRelationship(this.state.id,requestParam);

    this.refresh()

  }

  removeClick = async () =>{

    var requestParam = {
        params: {
          userId: Number(this.state.id) ,
          otherId: this.state.currentBtnId, 
      }
    }

    await UserDataService.deleteRelationship(this.state.id,requestParam);

    this.refresh()

  }

  viewMoreActions = (id) => {

    let style = null

        if( id != null ){
            const element = document.getElementById(id);
            const elementPosition = element.getBoundingClientRect();
            style = this.getStyleMoreActions(elementPosition)
            console.log(elementPosition)
        
            this.setState({show: true,
                           styleMoreActions:  style, 
                           currentBtnId: StringHelpers.extractNumberFromString(id)})
        }else{
            this.setState({show: true})
        }
        
  }

  cancelViewMoreActions = (id) =>{
    this.setState({show: false})
  }

  getStyleMoreActions = (elementPosition) =>{

    let style = {
                    position : "absolute",
                    bottom: "",
                    height: "250px",
                    left: "",
                    right: "",
                    top: "",
                    width: "250px",
                    backgroundColor: Color.YELLOW
         } 

     const lengthElemScrollTop = window.scrollY

     style.bottom = elementPosition.bottom.toString()+"px"
     style.left =  (elementPosition.left-60).toString()+"px"
     style.right = elementPosition.right.toString()+"px"
     style.top =  (elementPosition.top+60+lengthElemScrollTop).toString()+"px"
          
 return style

}

  handleChange = (event) => {

    const filteredListRequests = this.getListfilter(event.target.value)
    
    this.setState({
      [event.target.name] : event.target.value,
      filteredListRequests : filteredListRequests
    })

  }
  
  getNumRow = (colCount) =>{

    let rowcount

    if(this.state.filteredListRequests!=null){
      rowcount = Math.ceil(this.state.filteredListRequests.length / colCount) ;
     }else{
       rowcount = 0;
     }

     return rowcount
  }

  buildListViewRequests = () =>{

    const listViewRequest = [];
    let view

    for(let i = 0; this.state.filteredListRequests != null && i<this.state.filteredListRequests.length;i++){

       const view = this.buildViewRequests(this.state.filteredListRequests[i].target.username,
                                           this.state.filteredListRequests[i].target.id,
                                           this.state.filteredListRequests[i].target.image[0].content,
                                           this.confirmRequestClick)

        listViewRequest.push( view )

        }

      return listViewRequest

    }

    buildViewRequests = (username,id,image,confirmRequestClick) => {

      return  <div className='wrapper'>
                <Button style={{background: Color.BLUE, border: Color.BLUE  }} onClick={e => confirmRequestClick(e.target.id)}  id={id} className='c1 mt-4'>Confirm</Button>
                <div className='c3 d-inline-block'>{username}</div> 
                <Image id={id+"image"}
                       onMouseEnter={e => this.viewMoreActions(e.target.id)} 
                       onMouseLeave={ e  =>  this.cancelViewMoreActions(e.target.id)}
                       src={`data:image/jpeg;base64,${image}`} 
                       className="grid-image mt-3 c2" />  
              </div> 
    }

    getListfilter = (val) =>{

      const listfilter = [];
      let username = ''

      for(let i = 0; i< this.state.fullListRequests.length ; i++){

            username = this.state.fullListRequests[i].target.username

            if(username.includes(val)){
              listfilter.push(this.state.fullListRequests[i])
            }
      }

      return listfilter

    }
  
  render() {
    
    const title = "Friend requests"
    const btnText = "Find friends"
    const colCount = 2
    const rowcount = this.getNumRow(colCount)
    const ListViewRequests = this.buildListViewRequests()
    const linkStyle = this.state.styleMoreActions
    
    return (

      <div className="mx-auto">

              <SubNavbar handleChange={this.handleChange} 
                         valSerach={this.state.valSerach}
                         btnText={btnText}
                         title={title}/>

              {this.state.show && <div style={linkStyle} 
                                        onMouseEnter={e => this.viewMoreActions(null)} 
                                        onMouseLeave={ e  => this.cancelViewMoreActions(null)} >
                
                                            <p> More actions </p>
                                            <Button  className='bg-success d-block mx-auto w-75 mt-5 '>Send a message</Button>
                                            <Button onClick={this.removeClick} className='bg-secondary d-block mx-auto w-75 mt-3'>Remove</Button>
                                            <Button onClick={this.blockClick} className='bg-danger d-block mx-auto w-75 mt-3'>block</Button>

                                    </div>}

               <GridSystem rowcount = {rowcount} 
                           colCount = {colCount} 
                           view={ListViewRequests}
               />

      </div>

    );
  }
}

export default ShowFriendRequests