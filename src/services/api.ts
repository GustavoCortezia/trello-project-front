import axios from "axios";
import { getUserToken } from "./authentication";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});


export async function getCards() {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.get('/card', config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function deleteSection(id:number) {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.delete('/section/' + id, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function editSection(id:number, name:string, color:string) {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.put('/section/' + id, {name:name, color:color}, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function createCards(name:string, date:string, sectionId: number, environmentId: number) {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.post('/card',{name:name, date:date, sectionId:sectionId, environmentId: environmentId}, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }

}

export async function getEnvironments() {
    const config = {
      headers: {
        Authorization: `Bearer ${getUserToken()}`}
    };
    try {
      const response = await client.get('/environment/', config);
      return response;
    } catch (error:any) {
      return error?.response;
    }
}

export async function showEnvironment(id:number){
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.get('/environment/' + id, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function createSection(name:string, environmentId: number, color:string) {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.post('/section/', {name:name, environmentId: environmentId, color:color}, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function getSections(id:number){
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.get('/section?environmentId=' +id, config);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function createEnvironment(name:string, color:string) {
  const config = {
    headers: {
      Authorization: `Bearer ${getUserToken()}`}
  };
  try {
    const response = await client.post('/environment', {name:name, color:color}, config);
    return response;
  } catch (error) {

  }
}

export async function login(email:string, password:string){
  try {
    const response = await client.post('/login', {email:email, password: password});
    sessionStorage.setItem('token', response.data.token);
    return response;
  } catch (error:any) {
    return error?.response;
  }
}

export async function register(name:string, email:string, password:string){
  try {
    const response = await client.post('/user', {name:name, email:email, password: password});
    return response;
  } catch (error:any) {
    return error?.response;
  }
}
