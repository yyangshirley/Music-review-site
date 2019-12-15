import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './Song';
import { User } from './User';
import { Review } from './Review';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL= environment.API_URL;
 
  
  constructor(private http:HttpClient) { }
  getSong():Observable<Song[]>{
    return this.http.get<Song[]>(`${this.BASE_URL}/api/song`)
  }

  getAllSong(){
    return this.http.get(`${this.BASE_URL}/api/allSong`)
  }

  createSong(songTitle:string,songArtist:string,albumTitle:String,year:number,track:number,genre:number):Observable<Song[]>{
    return this.http.post<Song[]>(`${this.BASE_URL}/api/song`,
    {
      songTitle,songArtist,albumTitle,year,track,genre
    });
  }
  searchSong(keyword:string) {
    return this.http.post(this.BASE_URL+ '/api/song/search',{keyword}) 
  }

  //review: All the reviews in detail
  reviewDetail(title:string) {
    return this.http.post(this.BASE_URL+ '/api/review/detail',{title}) 
  }

  //user wirtes a commetn
  writeReview(
    username:string,
    songTitle:string,
    reviewDate:string,
    reviews:string,
    rating:number
    ){
      return this.http.post(`${this.BASE_URL}/auth/review/create`,{
        username,songTitle,reviewDate,reviews,rating      
      })
  }

  //review:Average ratings 
  getReview():Observable<Review[]>{
    return this.http.get<Review[]>(`${this.BASE_URL}/api/review/rating`)
  }

  getLatestReview(songTitle:string){
    return this.http.post(`${this.BASE_URL}/api/review`,{songTitle})
  }

  register(username:string, password:string):Observable<User[]>{
    return this.http.post<User[]>(`${this.BASE_URL}/auth/user/register`,{
      username,password
    })
  }

  getPlaylist(){
    return this.http.get(`${this.BASE_URL}/api/playlist`)
  }

  getSongDetailfromPlaylist(){
    return this.http.get(`${this.BASE_URL}/api/playlistDetail`)
  }
  
  createPlaylist(listTitle:string,description:string,username:string,status:string){
    return this.http.post(`${this.BASE_URL}/auth/playlist`,{
      listTitle,description,username,status})
  }

  addSongtoPlaylist(listTitle:string,username:string,song:string){
    return this.http.post(`${this.BASE_URL}/auth/playlist/add`,{
      listTitle,username,song})
  }


  deleteSongfromPlaylist(listTitle:string,username:string,song:string){
    return this.http.post(`${this.BASE_URL}/auth/playlist/delete`,{
      listTitle,username,song})  
  }
  
  updatePlaylist(listTitle:string,description:string,username:string,status:string){
    return this.http.post(`${this.BASE_URL}/auth/playlist/update`,{
      listTitle,description,username,status})
  }
    
  //get my playlist
  myPlaylist(username:string){
    return this.http.post(`${this.BASE_URL}/auth/myplaylist`,{username})
  }

  checkUser(username:string){
    return this.http.post(`${this.BASE_URL}/auth/checkuser`,{username})
  }

  getAllUser(){
    return this.http.get(`${this.BASE_URL}/auth/user/all`)
  }

  setStatus(username:string,status:string){
    return this.http.post(`${this.BASE_URL}/auth/user/status`,{username,status})
  }
  setPrivilege(username:string,privilege:string){
    return this.http.post(`${this.BASE_URL}/auth/user/privilege`,{username,privilege})
  }

  setSongStatus(songTitle:string,status:string){
    return this.http.post(`${this.BASE_URL}/api/song/status`,{songTitle,status})
  }
}
