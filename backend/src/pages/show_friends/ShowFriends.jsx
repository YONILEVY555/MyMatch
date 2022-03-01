import React, {Component} from "react";
import UserDataService from "@api/user/UserDataService";
import AuthenticationService from "@services/AuthenticationService.js"
import GridSystem from '@components/GridSystem.js';
import {Image, Button } from "react-bootstrap"
import SubNavbar from "@components/SubNavbar.js";
import StringHelpers from "@utils/helpers/StringHelpers.js"
import {Color} from '@utils/constants/Color.js'

class ShowFriends extends Component {
  
  constructor(props){
    super(props)
        this.state = {
            id: AuthenticationService.getLoggedInUserId(),
            fullListFriends: null,
            filteredFriendsList: null,
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
    const res =  await UserDataService.getFriends(this.state.id);
    this.setState({fullListFriends : res.data,
                   filteredFriendsList: res.data })
  }
   
  cancelFriendshipClick = async (friendId) =>{

    var requestParam = {
        params: {
          userId: Number(this.state.id) ,
          otherId: Number(friendId), 
      }
    }

    await UserDataService.deleteRelationship(this.state.id,requestParam);

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
                    backgroundColor: 'orange'
         } 

     const lengthElemScrollTop = window.scrollY

     style.bottom = elementPosition.bottom.toString()+"px"
     style.left =  (elementPosition.left-60).toString()+"px"
     style.right = elementPosition.right.toString()+"px"
     style.top =  (elementPosition.top+60+lengthElemScrollTop).toString()+"px"
          
 return style

}

  handleChange = (event) => {

    const filteredFriendsList = this.getListfilter(event.target.value)
    
    this.setState({
      [event.target.name] : event.target.value,
      filteredFriendsList : filteredFriendsList
    })

  }
  
  getNumRow = (colCount) =>{

    let rowcount

    if(this.state.filteredFriendsList!=null){
      rowcount = Math.ceil(this.state.filteredFriendsList.length / colCount) ;
     }else{
       rowcount = 0;
     }

     return rowcount
  }

  buildListViewFriends = () =>{

    const ListViewFriends = [];
    let view

    for(let i = 0; this.state.filteredFriendsList != null && i<this.state.filteredFriendsList.length;i++){

       const view = this.buildViewFriend(this.state.filteredFriendsList[i].username,
                                this.state.filteredFriendsList[i].id,
                                this.state.filteredFriendsList[i].image[0].content,
                                this.cancelFriendshipClick)

        ListViewFriends.push( view )
        }

      return ListViewFriends
    }

    buildViewFriend = (username,id,image,cancelFriendshipClick) => {

      return  <div className='wrapper'>
                <Button style={{background: Color.BLUE, border: Color.BLUE  }} onClick={e => cancelFriendshipClick(e.target.id)}  id={id} className='c1 mt-4'>cancel friendship</Button>
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

      for(let i = 0; i< this.state.fullListFriends.length ; i++){

            username = this.state.fullListFriends[i].username

            if(username.includes(val)){
              listfilter.push(this.state.fullListFriends[i])
            }
      }

      return listfilter

    }
  
  render() {

    const title = "friends"
    const btnText = "Find friends"
    const colCount = 2
    const rowcount = this.getNumRow(colCount)
    const ListViewFriends = this.buildListViewFriends()
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
                                            <Button onClick={this.blockClick} className='bg-danger d-block mx-auto w-75 mt-3'>block</Button>

                                    </div>}

               <GridSystem rowcount = {rowcount} 
                           colCount = {colCount} 
                           view={ListViewFriends}
               />

      </div>

    );
  }
}

export default ShowFriends
