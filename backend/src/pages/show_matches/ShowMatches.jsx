import React, {Component} from "react";
import UserDataService from "@api/user/UserDataService";
import AuthenticationService from "@services/AuthenticationService.js"
import GridSystem from '@components/GridSystem.js';
import {Image, Button } from "react-bootstrap"
import SubNavbar from "@components/SubNavbar.js";
import StringHelpers from "@utils/helpers/StringHelpers.js"
import {Color} from '@utils/constants/Color.js'

class ShowMatches extends Component {
  
  constructor(props){
    super(props)
        this.state = {
            id: AuthenticationService.getLoggedInUserId(),
            fullListMatches: null,
            filteredMatchesList: null,
            Serach: '',
            show: false,
            styleMoreActions: null,
            currentBtnId: null
        }
  }

  componentDidMount(){
    this.refresh()
  }

  refresh = async () =>{
    const res =  await UserDataService.getMatches(this.state.id);
    this.setState({fullListMatches : res.data,
                   filteredMatchesList: res.data })
  }

  cancelMatchesClick = async (MatchId) =>{

    var requestParam = {
        params: {
          userId: Number(this.state.id) ,
          otherId: Number(MatchId), 
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

  cancelViewMoreActions = (id) =>{
    this.setState({show: false})
  }

  handleChange = (event) => {

    const filteredMatchesList = this.getListfilter(event.target.value)
    
    this.setState({
      [event.target.name] : event.target.value,
      filteredMatchesList : filteredMatchesList
    })

  }
  
  getNumRow = (colCount) =>{

    let rowcount

    if(this.state.filteredMatchesList!=null){
      rowcount = Math.ceil(this.state.filteredMatchesList.length / colCount) ;
     }else{
       rowcount = 0;
     }

     return rowcount
  }

  buildListViewMatches = () =>{

    const ListViewMatches = [];
    let view

    for(let i = 0; this.state.filteredMatchesList != null && i<this.state.filteredMatchesList.length;i++){

       const view = this.buildViewMatch(this.state.filteredMatchesList[i].username,
                                this.state.filteredMatchesList[i].id,
                                this.state.filteredMatchesList[i].image[0].content,
                                this.cancelMatchesClick,
                                this.viewMoreActions,
                                this.cancelViewMoreActions)

        ListViewMatches.push( view )
        }

      return ListViewMatches
    }

    buildViewMatch = (username,id,image, cancelMatchesClick, viewMoreActions,cancelViewMoreActions ) => {

      return  <div className='wrapper'>
                <Button style={{background: Color.BLUE, border: Color.BLUE  }} onClick={e => cancelMatchesClick(e.target.id)}  id={id} className='c1 mt-4 d-block'>cancel matche</Button>
                <div className='c3 d-inline-block'>{username}</div> 
                <Image id={id+"image"}
                       onMouseEnter={e => viewMoreActions(e.target.id)} 
                       onMouseLeave={ e  => cancelViewMoreActions(e.target.id)}
                       src={`data:image/jpeg;base64,${image}`} 
                       className="grid-image mt-3 c2" />  
              </div> 
    }
     
    getListfilter = (val) =>{
    
      const listfilter = [];
      let username = ''
                        
      for(let i = 0; i< this.state.fullListMatches.length ; i++){

            username = this.state.fullListMatches[i].username

            if(username.includes(val)){
              listfilter.push(this.state.fullListMatches[i])
            }
    }

      return listfilter

    }
  
  render() {
    
    const title = "Matches"
    const btnText = "Find Matches"
    const colCount = 2
    const rowcount = this.getNumRow(colCount)
    const ListViewMatches = this.buildListViewMatches()
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
                           view={ListViewMatches}
               />

      </div>

    );
  }
}

export default ShowMatches