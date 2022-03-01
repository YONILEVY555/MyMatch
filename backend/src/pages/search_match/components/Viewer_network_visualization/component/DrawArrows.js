import React from 'react'
import Xarrow from "react-xarrows";
import {Color} from '@utils/constants/Color.js'
// style={{background: Color.BLUE, border: Color.BLUE  }}
const DrawArrows = (props) => {
   
const renderXarrow = (props) =>{

    let xarrow = [];

    for(let arrow = 0; props.DrawArrowsData!=null && props.DrawArrowsData[arrow] != undefined && arrow < props.DrawArrowsData.length ;arrow++){
    
        if(props.DrawArrowsData[arrow].next!=null){
            xarrow.push(
                <Xarrow
                    start={props.DrawArrowsData[arrow].index} 
                    end= {props.DrawArrowsData[arrow].next}
                    color = {Color.BLUE}
                />
            )
        }
    }

    return xarrow;

}

return renderXarrow(props);

};

export default DrawArrows;
