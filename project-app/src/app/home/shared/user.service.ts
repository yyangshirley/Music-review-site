import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { environment } from "../../../environments/environment";
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User={
    username:'',
    password:'',
    status:'',
    privilege:''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor( private http:HttpClient) { }
  postUser(user: User){
    return this.http.post(environment.API_URL+'/auth/user/register',user);
  }

  login(authCredentials) {
    return this.http.post(environment.API_URL+ '/auth/user/login', authCredentials,this.noAuthHeader);
  }

 //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
    console.log(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
