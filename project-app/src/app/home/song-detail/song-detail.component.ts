import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Review } from 'src/app/Review';
import { Song } from 'src/app/Song';
import { UserService } from '../shared/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Playlist } from 'src/app/Playlist';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SongDetailComponent implements OnInit {

  public reviews:Review[];
  public playlist:Playlist[];

  
  public songs:Song[];
  public errorMsg:string;
  public successMsg:string;
  constructor(private activatedRoute:ActivatedRoute,
    private httpService:HttpService,
    private userService:UserService,
    private router:Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((p)=>{
      const title=p.songTitle;
      const username=p.username;
      if(username){
        document.getElementById("button").style.display="";
      }
      this.refresh()
      this.songDetail(title);
      this.getReviews(title);
      this.myplaylist();
    });
    
  }
  myplaylist(){
    this.activatedRoute.queryParams.subscribe((p)=>{
      const keyword=p.username;
      if(keyword){
        this.httpService.myPlaylist(keyword).subscribe((playlist:Playlist[])=>{
          this.playlist=playlist;
          console.log(playlist)
        })
      }
    });
  }

  //create a new playlist
  createPlaylist(listTitle:string,description:string,status:string,form:NgForm){
    this.errorMsg="";
    this.successMsg="";

    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      this.httpService.createPlaylist(listTitle,description,username,status).subscribe((playlist:Playlist[])=>{
        // this.playlist=playlist;
        
      }),(error:ErrorEvent)=>{
        this.errorMsg=error.error.massage;
      }
      document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.successMsg="Successfully create the playlist!"
    });
    this.resetForm(form);
  }

  //add song to the playlist
  addPlaylist(listTitle:string){
    // this.errorMsg="";
    // this.successMsg="";
    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      const song=p.songTitle;

      if(username){
        this.httpService.addSongtoPlaylist(listTitle,username,song).subscribe((playlist:Playlist[])=>{
          // this.playlist=playlist;
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }),(error:ErrorEvent)=>{
          this.errorMsg=error.error.massage;
        }
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.successMsg="Successfully add to your playlist!"

      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to create your own playlist!"
      }
    });
  }
 
  songDetail(keyword:string){
    this.httpService.searchSong(keyword).subscribe((song:Song[])=>{
        this.songs=song; 
        console.log(this.songs)
    })
  }

  getReviews(title:string){
    this.errorMsg="";

      this.httpService.reviewDetail(title).subscribe((review:Review[])=>{
        this.reviews=review;
        console.log(this.reviews)
      }),(error:ErrorEvent)=>{
        this.errorMsg=error.error.massage;
      }
  }

  refresh(){
    this.activatedRoute.queryParams.subscribe((p)=>{
      const keyword=p.songTitle;
      console.log(keyword)
      this.songDetail(keyword)
      this.getReviews(keyword)
    });
  }

  writeReview(){
    this.errorMsg="";

    this.activatedRoute.queryParams.subscribe((p)=>{
      const user=p.username;
      console.log(user)
      if(user){
        document.getElementById("writeReview").style.display="";
      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to comment!"
      }
     
    });
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  //write the review
  submit(reviews:string, rating:number){
    this.successMsg="";

    this.activatedRoute.queryParams.subscribe((p)=>{
      const songTitle=p.songTitle;
      const username=p.username;
      var myDate = new Date();
      var reviewDate=myDate.toLocaleDateString();
      this.httpService.writeReview(username,songTitle,reviewDate,reviews,rating).subscribe((review:Review[])=>{
        this.reviews=review;
        console.log(this.reviews)
      })
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.successMsg="Thank you for your review!!!"

    });
    document.getElementById("writeReview").style.display="none";
    this.refresh();
  }
  
  resetForm(form: NgForm) {
    
    form.resetForm();
  }

}
