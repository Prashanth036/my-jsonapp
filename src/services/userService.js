import api from "../api/axios"

class UserService{
    static getUsers(ids){
        console.log(ids)
        return api.get(`/users?limit=10&skip=${ids}`)
    }
    static getFirstPageUsers(){
        return api.get(`/users?limit=10`)
    }
    static getUserPosts(id){
        return api.get(`/users/${id}/posts`)
    }
}

export default UserService

