
import {JPA_API_URL} from "@utils/constants/Url.js"
import axios from "axios"

class UserDataService{

    async retrieveUser(id){

        return axios.get(`${JPA_API_URL}/users/${id}`)

    }

    deleteUser(id) {
       
        return axios.delete(`${JPA_API_URL}/users/${id}`)
    }

    updateUser(user, id){

        return axios.put(`${JPA_API_URL}/users/${id}`, user)

    }

    async createUser(user){

        return axios.post(`${JPA_API_URL}/users/`, user)

    }

    createBlocked(id,user){

        return axios.post(`${JPA_API_URL}/users/${id}/blocked`, user)

    }

    async uploadImage( id, formData)
    {   
        return axios.post(`${JPA_API_URL}/users/${id}/images`,formData)

    }

    async updateImage( id,imageId,formData)
    {   
        return axios.put(`${JPA_API_URL}/users/${id}/images/${imageId}`,formData)

    }

    async getImage(id)
    {   
        return axios.get(`${JPA_API_URL}/users/${id}/images`)
    }

    async getImages(id)
    {   
        return axios.get(`${JPA_API_URL}/users/${id}/images`)
    }

    async getOptionMatches(id){   
        return axios.get(`${JPA_API_URL}/users/${id}/optional_match`)
    }

    async getPathes(id,matchId){   
        return axios.get(`${JPA_API_URL}/users/${id}/pathes/${matchId}`)
    }

    async getMatches(id){   
        return axios.get(`${JPA_API_URL}/users/${id}/matches`)
    }
   
    async getRelationships(id,requestParam){ 

        return axios.get(`${JPA_API_URL}/users/${id}/relationships`,requestParam)

    }

    async getRelationship(id,otherId,requestParam){ 

        return axios.get(`${JPA_API_URL}/users/${id}/relationships/${otherId}`,requestParam)
        
    }

    async createRelationship(id,requestParam){ 

        return axios.post(`${JPA_API_URL}/users/${id}/relationships`,null,requestParam)

    }
    
    async updateRelationship(id,requestParam){ 

        return axios.put(`${JPA_API_URL}/users/${id}/relationships`,null,requestParam)

    }

    async deleteRelationship(id,requestParam){ 
    
        return axios.delete(`${JPA_API_URL}/users/${id}/relationships`,requestParam)

    }

    async getFriends(id){ 
    
        return axios.get(`${JPA_API_URL}/users/${id}/friends`)

    }

    async getPreferences(id){ 
    
        return axios.get(`${JPA_API_URL}/users/${id}/preferences`)

    }

    async updatePreferences(id,requestParam){ 
    
        return axios.put(`${JPA_API_URL}/users/${id}/preferences`,null,requestParam)

    }
}

export default new UserDataService()