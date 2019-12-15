import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../User';
import { Review } from '../Review';
import { HttpService } from '../http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Song } from '../Song';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  public loading=true;
  public errorMsg:string;
  public successMsg:string;
  public username:string;
  public email:string;
  public password:string;
  public user:User[];
  public ratings: Review[];
  public latestReview:Review[];
  public songs: Song[];
  public r:string;
  public review_columns = ['songTitle', 'avgRating'];
  public song_columns=['songTitle','songArtist']
  constructor(private httpService:HttpService,private router:Router, private activatedRoute:ActivatedRoute) { }


  ngOnInit() {
    
    this.httpService.getReview().subscribe((reviews:Review[])=>{
      this.ratings=reviews;
      this.loading=false;
    },(error:ErrorEvent)=>{
      this.errorMsg=error.error.massage;
      this.loading=false;
    });
  }

  getLatest(title:string){
    this.httpService.getLatestReview(title).subscribe((review:Review[])=>{
      this.latestReview=review;
      console.log(this.latestReview)
    })
  }

  search(keyword:string){
    this.httpService.searchSong(keyword).subscribe((song:Song[])=>{
      if(song.length==0){
        this.errorMsg="There is no result!!! Please check the keyword."
        document.getElementById("searching").style.display="none";

      }
      else{
        this.errorMsg="";
        document.getElementById("searching").style.display="";
        this.songs=song;
      }
      
      
    },(error:ErrorEvent)=>{
      this.errorMsg=error.error.massage;
    })
  }

  // checkUser(){
  //   this.activatedRoute.queryParams.subscribe((p)=>{
  //     if(p){
  //       const keyword=p.username;

  //       this.router.navigate(['/secure'],{ 
  //         queryParams:{
  //           username=keyword;
  //         }
  //       });
  //     }
      
  //   });
  // }

  songDetail(song:string){
    console.log(song);
    this.activatedRoute.queryParams.subscribe((p)=>{
      const keyword=p.username;
      this.router.navigate(['/home/songDetail'],{
        queryParams:{
          songTitle:song,
          username:keyword
        }
      });
    });
    // this.router.navigate(['/home/songDetail'],{
    //   queryParams:{
    //     songTitle:song
    //   }
    // });
  }
}
