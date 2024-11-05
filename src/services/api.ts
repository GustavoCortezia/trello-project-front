import axios from "axios";
import { getUserToken } from "./authentication";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});


export async function getEnvironments(id:number) {
    const config = {
      headers: {
        Authorization: `Bearer ${getUserToken()}`}
    };
    try {
      const response = await client.get('/environment', config);
      return response;
    } catch (error:any) {
      return error?.response;
    }
}

export async function login(email:string, password:string){
  try {
    const response = await client.post('/login', {email:email, password: password});
    sessionStorage.setItem('Token', response.data.token);
    return response;
  } catch (error) {

  }
}
