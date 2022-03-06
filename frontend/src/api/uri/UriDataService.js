import {JPA_API_URL} from "@utils/constants/Url.js"
import axios from "axios"

class UriDataService{

    async getByUri(uri){

        return axios.get(`${uri}`)

    }

    deleteByUri(uri) {
       
        return axios.delete(`${uri}`)
    }

    putByUri(uri){

        return axios.put(`${uri}`)

    }

    postByUri(uri){

        return axios.post(`${uri}`)

    }

}

export default new UriDataService()