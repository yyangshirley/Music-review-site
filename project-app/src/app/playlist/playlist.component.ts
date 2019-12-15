import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Playlist } from '../Playlist';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  successMsg:string;
  errorMsg:string;

  playlist:Playlist[];
  objectKeys = Object.keys;
  obj=[];
  constructor(public httpService:HttpService) { }

  ngOnInit() {
    this.getPlaylist();
  }

  getPlaylist(){
    this.httpService.getPlaylist().subscribe((playlist:Playlist[])=>{
      this.playlist=playlist;
      console.log(this.playlist);
    })
  }

  createPlaylist(listTitle:string,description:string,username:string,status:string){
    if(listTitle!=null){
      this.httpService.createPlaylist(listTitle,description,username,status).subscribe((playlist:Playlist[])=>{
      
      })
    } 
    else{
      this.errorMsg="please"
    }   
  }


}
