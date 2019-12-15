import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../home/shared/user.model';
import { UserService } from '../home/shared/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { HttpService } from '../http.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Song } from '../Song';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users:User[];
  public songs:Song[];
  public privilege_columns=['username','privilege','operation'];
  public status_columns=['username','status','operation'];
  public song_columns=['songTitle','visibility','operation'];

  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  model:User={
    username:'',
    password:'',
    status:'',
    privilege:''
  };

  constructor(
    private userService:UserService,
    private router:Router,
    private authService:AuthService,
    private httpService:HttpService) { }

  ngOnInit() {
    this.getAllUser();
    this.getSong()
  }

  getAllUser(){
    this.httpService.getAllUser().subscribe((user:User[])=>{
      this.users=user;
    })
  }

  setPrivilege(username:string){
    this.httpService.setPrivilege(username,"sm").subscribe((user:User[])=>{
      // this.users=user;
    })
    this.getAllUser()

  }
  cancelPri(username:string){
    this.httpService.setPrivilege(username,"normal").subscribe((user:User[])=>{
      // this.users=user;
    })
    this.getAllUser()
  }

  setDe(username:string){
    this.httpService.setStatus(username,"deactivated").subscribe((user:User[])=>{
      // this.users=user;
    })
    this.getAllUser()

  }
  setAc(username:string){
    this.httpService.setStatus(username,"activated").subscribe((user:User[])=>{
      // this.users=user;
    })
    this.getAllUser()
  }

  setHidden(songTitle:string){
    this.httpService.setSongStatus(songTitle,"hidden").subscribe((songr:Song[])=>{
    })
    this.getSong()
  }
  cancelHi(songTitle:string){
    this.httpService.setSongStatus(songTitle,"open").subscribe((song:Song[])=>{
    })
    this.getSong()
  }


  getSong(){
    this.httpService.getAllSong().subscribe((song:Song[])=>{
      this.songs=song;
    })
  }
}
