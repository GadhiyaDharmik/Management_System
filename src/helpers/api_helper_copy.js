import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"
import qs from 'qs';
//pass new generated access token here
const token =   localStorage.getItem('accessToken');

//apply base url for axios
// const API_URL = "https://reqres.in/"
const API_URL = "http://18.183.157.20:3000/api/v1/"

const axiosApi = axios.create({
  baseURL: API_URL,
})
axiosApi.defaults.withCredentials = true;                                
// axiosApi.defaults.headers.common["Authorization"] = token
// axiosApi.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
// axiosApi.defaults.headers.common["Cookie"] = "WHMCSejRPihBBu1GH=momj7cjd62k5s1nr9a85ivt5vh";

axios.interceptors.request.use(function (config) {
  let authUser = JSON.parse(localStorage.getItem('authUser'));
  // console.log('authUser', authUser, config)
  if(authUser) {
    config['headers']['common']['Authorization'] = `Bearer ${token}`
  }
  // console.log('authUser config', config)
  return config;
});

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

// export async function get(url, config = {}) {
//   return await axiosApi.get(url, { ...config }).then(response => response.data)
// }

export async function getNew(url,config = {}) {
  let authUser = JSON.parse(localStorage.getItem('authUser'));
  var config = {
    method: 'GET',
    url: `${API_URL}`,
    headers: { 
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  return axios(config);
}

export async function postNew(url, data, config = {}) {
  var data = qs.stringify({
    'email': data.email,
    'password': data.password 
  });
  var config = {
    method: 'POST',
    url: `${API_URL+url}`,
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data : data, 
  };
  
  return axios(config);
}


export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}