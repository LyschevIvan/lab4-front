import axios from "axios";

const axiosInstance = axios.create(
  {
    baseURL:"http://127.0.0.1:50680/lab4/api/point"
  }
)

export const pointAPI = {
  async checkPoint(x,y,r, token){
    return axiosInstance.post('check', {
      'x' : x,
      'y' : y,
      'r' : r,
      'token' : token
    })
  },
  async getEntries(token) {
    return axiosInstance.post('get', {
      'token': token,
    });
  },
  async clearPoints(token){
    return axiosInstance.post('clear', {
      'token' : token
    })
  },
  async removePoint(token, id){
    return axiosInstance.post('remove', {
      'token' : token,
      'id' : id
    })
  }

}