import axios from "axios";

const axiosWithAuth=axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("jwt_token")}`
    }
})

const checkAuthHeads:()=>boolean =()=>{
    if (localStorage.getItem("jwt_token")){
        return true
    }
    return false
}

export {axiosWithAuth,checkAuthHeads}