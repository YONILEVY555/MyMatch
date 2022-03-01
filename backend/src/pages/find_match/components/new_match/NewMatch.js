
import {Image} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Color} from '@utils/constants/Color.js'

export const NewMatch = (props) => {

    return  <div className="set-same-screen-size">

                <div className="Background-blue text-light opacity-100 d-inline-block w-50 h-50 mx-auto mt-5">
    
                      <h1 className="fs-2">IT'S A <span className="color-text-green fw-bold fs-1 ">NEW MATCH!</span></h1>
                      {<Image src={`data:image/jpeg;base64,${props.image}`} className="w-50 h-50 mt-5 mb-3"  id={props.id} /> }
                       <div>
                            <FontAwesomeIcon className="d-inline-block mx-auto me-1"  size="lg" color={Color.GREEN}  icon={faHeart} />
                            <FontAwesomeIcon className="d-inline-block mx-auto me-1" size="lg" color={Color.PURPLE} icon={faHeart} />
                            <FontAwesomeIcon className="d-inline-block mx-auto me-1" size="lg" color={Color.YELLOW} icon={faHeart} />
                       </div>
                      <h2 className="mb-3">{props.nameMatch} likes you too!</h2>

                </div> 

            </div>
 }