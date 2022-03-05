
import React, { Component } from 'react'
import {ViewerNetworkVisualization,ViewerPotenMatch,NewMatch,NotFoundOptionMatches} from './components/index.js'
import {UserDataService} from '@api/index.js'
import AuthenticationService from '@services/AuthenticationService.js'

class SearchMatch extends Component {
 
    constructor(props){
         super(props)
           this.state = {
                   id: AuthenticationService.getLoggedInUserId(),
                   optionMatches: null,
                   indexCurrentMatch: 0,
                   indexCurrentRelationShip: 0,
                   pathes: null,
                   myImages: null,
                   initialIndexPathSearch: 0,
                   relationships: null,
                   flagNewMatch: false,
                   isFoundOptionMatches: true
            }
        
    }

    componentDidMount(){
         this.refresh()
    }

    refresh = async () =>{

        var requestParam = {
            params: {
              type: "M",
              status: "S"
            }
        }
    
        try{
            const resOptionMatches = await UserDataService.getOptionMatches(this.state.id); 
            const resPathes = await UserDataService.getPathes(this.state.id, resOptionMatches.data[0].id ); 
            const resMyImages = await UserDataService.getImages(this.state.id);
            const relationships = await UserDataService.getRelationships(this.state.id,requestParam);
            
            this.setState(
                { 
                    optionMatches: resOptionMatches.data,
                    pathes: resPathes.data,
                    myImages: resMyImages.data, 
                    relationships: relationships.data,
                    isFoundOptionMatches: true
                }
            )
        }catch(e){

        
            this.setState(
                { 
                    isFoundOptionMatches: false
                }
            )

        }
    }

    likeClicked = async () =>{
        
        let resPathes = null
        let newIndexCurrentMatch = 0

        this.createOrUpdateMatch();

        if(this.state.indexCurrentMatch < this.state.optionMatches.length -1 ){
            resPathes = await UserDataService.getPathes(this.state.id, this.state.optionMatches[this.state.indexCurrentMatch+1].id )
            newIndexCurrentMatch = this.state.indexCurrentMatch + 1 
        }else{
            resPathes = await UserDataService.getPathes(this.state.id, this.state.optionMatches[0].id )
        }
        
        this.setState(
                { 
                  indexCurrentMatch: newIndexCurrentMatch,
                  pathes: resPathes.data 
                }
        )
    }

    backClicked = () =>{

        if(this.state.indexCurrentMatch == 0 )
            this.setState(prevstate => (
                { indexCurrentMatch: this.state.optionMatches.length -1}
            ))
        else{
            this.setState(prevstate => (
                { indexCurrentMatch: prevstate.indexCurrentMatch - 1}
            
            ))
        }
    }

    unlikeClicked = async () =>{

        let resPathes = null
        let newIndexCurrentMatch = 0

        if(this.state.indexCurrentMatch < this.state.optionMatches.length -1 ){
            resPathes = await UserDataService.getPathes(this.state.id, this.state.optionMatches[this.state.indexCurrentMatch+1].id )
            newIndexCurrentMatch = this.state.indexCurrentMatch + 1 
        }else{
            resPathes = await UserDataService.getPathes(this.state.id, this.state.optionMatches[0].id )
        }
        
        this.setState(
                { 
                  indexCurrentMatch: newIndexCurrentMatch,
                  pathes: resPathes.data 
                }
        ) 

    }  
     
    getMorePathes = () =>{

        this.setState(prevstate => (
            { 
                initialIndexPathSearch: prevstate.initialIndexPathSearch + 4,
            }
        ))

    }

    createOrUpdateMatch = async () =>{

        const isFullMatch = this.isFullMatch(this.state.relationships, this.state.optionMatches[this.state.indexCurrentMatch].id)

        var requestParam = {
            params: {
                userId: Number(this.state.id) ,
                otherId: this.state.optionMatches[this.state.indexCurrentMatch].id,
                type: 'MATCH' ,
                status: '' 
            }
        }

        if( isFullMatch ){
            this.createFullMatch(requestParam)
        }else{
            this.createPartialMatch(requestParam)
        }

    }

    createFullMatch = async (requestParam) =>{

        requestParam.params.status = 'ACTIVE'

        await UserDataService.updateRelationship(this.state.id,requestParam);

        this.setState({
            flagNewMatch: true
        })

        await this.makeTimer()

    }

    makeTimer = async () =>{

        return new Promise( (resolve, reject) =>{
            if(this.state.flagNewMatch){
                setInterval(() => {
                    this.setState({
                        flagNewMatch: false
                    })
                    return resolve ({result:true})
                  }, 5000)
            }
        })

    }

    createPartialMatch = async (requestParam) =>{
        requestParam.params.status = 'STANDBY'
        await UserDataService.createRelationship(this.state.id,requestParam);
    }

    isFullMatch = (relationships, optionMatchId) =>{

        for( let i=0; i< relationships.length; i++ ){
            if( relationships[i].source.id == optionMatchId || relationships[i].target.id == optionMatchId){
                return true
            }
        }

        return false

    }

    updateInitialIndexPathSearchToZero = () =>{
        this.setState({initialIndexPathSearch: 0})
    }

    getOptionMatch = () =>{

        let optionMatch

        if( this.state.optionMatches != null )
            optionMatch = this.state.optionMatches[this.state.indexCurrentMatch];
       else
            optionMatch = null;

        return  optionMatch

    }

    getPrevOptionMatch = () =>{

        let PrevOptionMatch

        if( this.state.optionMatches != null ){
            if( this.state.indexCurrentMatch == 0){
                return null
            }
            else{
                PrevOptionMatch = this.state.optionMatches[this.state.indexCurrentMatch - 1];
            }
        }else{
            return null
        }
    
        return  PrevOptionMatch
    }

    render() {

        const optionMatch = this.getOptionMatch();
        const prevOptionMatch = this.getPrevOptionMatch();

        return (
            <div>
               
               { ( (!this.state.flagNewMatch) && 
                   this.state.isFoundOptionMatches) && <ViewerNetworkVisualization pathes={this.state.pathes} 
                                                                                    optionMatch={optionMatch}
                                                                                    myImages={this.state.myImages} 
                                                                                    startIndex={this.state.initialIndexPathSearch}
                                                                                    updateInitialIndexPathSearchToZero = {this.updateInitialIndexPathSearchToZero} />} 

               { ( (!this.state.flagNewMatch) && 
                     this.state.isFoundOptionMatches) && <ViewerPotenMatch likeClicked = {this.likeClicked} 
                                                                            backClicked = {this.backClicked}
                                                                            unlikeClicked = {this.unlikeClicked}
                                                                            getMorePathes = {this.getMorePathes}
                                                                            optionMatch = {optionMatch} />} 

                {this.state.flagNewMatch && <NewMatch image={prevOptionMatch.image[0].content} 
                                                      nameMatch={prevOptionMatch.username} />}

                { (!this.state.isFoundOptionMatches) && <NotFoundOptionMatches/> }
                                          
        
            </div>
        )
    }
}

export default SearchMatch