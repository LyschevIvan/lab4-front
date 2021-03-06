import axios from "axios";

const axiosInstance = axios.create(
  {
    baseURL:"http://127.0.0.1:50680/lab4/api/auth"
  }
)

const authAPI = {
  async doAuth(username, password){
      return axiosInstance.post("login", {username: username, password: password});
  },
  async doRegister(username, password){
    return axiosInstance.post("register", {username: username, password:password});
  },
  async doLogout(token){
    return axiosInstance.post("logout", {token : token});
  }
}


export default authAPI;
