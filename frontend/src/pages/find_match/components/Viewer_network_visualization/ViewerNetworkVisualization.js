
import React, { Component } from 'react'
import GridSystem from './component/GridSystem.js';
import DrawArrows from './component/DrawArrows.js';
import Xarrow from "react-xarrows";
import {Image} from "react-bootstrap"


export const ViewerNetworkVisualization = (props) => {

    const BuildDataForViewerNetworkVisualization = () =>{

        if( props.pathes!= null && props.optionMatch!=null && props.myImages !=null ){
            
            const gridSystemPathesIndex = [ ["12","6","2","1"] , ["13","8","9","3"] , ["18","23","24","29"] , ["17","22","21","26"] ]
             
            const gridSystemPathesData = Array.apply(null, Array(30)).map(function () {})
        
            let z = 0
    
            if( props.startIndex >=  props.pathes.length){
                props.updateInitialIndexPathSearchToZero()
             }

            for( let i =  props.startIndex, w=0 ; i <  props.pathes.length && i <= ( props.startIndex+ 3) ; i++, w++ ){
                for(let j = 0 ;j <=  props.pathes[i].length; j++){
                
                    if(j==0){
                        gridSystemPathesData[z++] = { next: gridSystemPathesIndex[w][j+1]  ,  index: gridSystemPathesIndex[w][j],  content:  props.myImages[0].content}
                    }
                    else{
                        if( j == ( props.pathes[i].length) ){
                            gridSystemPathesData[z++] = {next: gridSystemPathesIndex[w][j+1]  ,  index: gridSystemPathesIndex[w][j],  content:  props.pathes[i][j-1].image[0].content}
                            gridSystemPathesData[z++] = {next: null  ,  index: gridSystemPathesIndex[w][j+1],  content:  props.optionMatch.image[0].content}
                        }
                        else{
                            gridSystemPathesData[z++] = {next: gridSystemPathesIndex[w][j+1]  ,  index: gridSystemPathesIndex[w][j],  content:  props.pathes[i][j-1].image[0].content }  
                        }

                    }
                }
            }
            
            return gridSystemPathesData.sort(( a, b ) => {
                                                            if ( Number(a.index) < Number(b.index) ){
                                                              return -1;
                                                            }
                                                            if ( Number(a.index) > Number(b.index) ){
                                                              return 1;
                                                            }
                                                            return 0;
                                                        });
            }
            else{
                return null
            }       
    }

    return <>

             <>

                <GridSystem colCount={5} rowcount={6} gridSystemPathesData={BuildDataForViewerNetworkVisualization()} >          
                </GridSystem>
            
                <DrawArrows DrawArrowsData = {BuildDataForViewerNetworkVisualization()} >
                </DrawArrows>  
                
             </>

     </>

}
 
