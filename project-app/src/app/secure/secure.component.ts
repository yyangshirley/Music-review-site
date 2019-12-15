import { Component, OnInit } from '@angular/core';
import { UserService } from '../home/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../User';
import { Review } from '../Review';
import { HttpService } from '../http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Song } from '../Song';
import { Playlist } from '../Playlist';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SecureComponent implements OnInit {
  panelOpenState = false;

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
  public searchSong:Array<string>;

  public allSong:Song[];
  public reviews:Review[];
  public detail:Song[];
  public playlist:Playlist[];

  public yourList:Playlist[];

  public r:string;
  public review_columns = ['songTitle', 'avgRating'];
  public song_columns=['songTitle','songArtist','albumTitle','operation'];
  
  constructor(private httpService:HttpService,private userService:UserService, private router:Router,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.getReview();
    this.myplaylist();
    this.getSong()
  }

  getReview(){
    this.httpService.getReview().subscribe((reviews:Review[])=>{
      this.ratings=reviews;

      this.loading=false;
    },(error:ErrorEvent)=>{
      this.errorMsg=error.error.massage;
      this.loading=false;
    });  
  }

  getSong(){
    this.httpService.getSong().subscribe((song:Song[])=>{
      this.allSong=song;
    })
  }

  // getLatest(title:string){
  //   this.httpService.getLatestReview(title).subscribe((review:Review[])=>{
  //     this.latestReview=review;
  //     console.log(this.latestReview)
  //   })
  // }

  add(){
    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      if(username){
        document.getElementById("addSongs").style.display="";
      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to add a new song!"
      }
    });

  }

  writeReview(){
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

  cancelReview(){
    document.getElementById("writeReview").style.display="none";
  }
  deleteSong(listTitle:string,song:string){
    this.successMsg="";
    this.errorMsg=""

    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      this.httpService.deleteSongfromPlaylist(listTitle,username,song).subscribe((playlist:Playlist[])=>{

      }),(error:ErrorEvent)=>{
        this.errorMsg=error.error.massage;
      }
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.successMsg="The song is removed!!!"
    this.myplaylist();

  }

  
  addSong(songTitle:string,songArtist:string,albumTitle:String,year:number,track:number,genre:number){
    this.errorMsg=""
    this.activatedRoute.queryParams.subscribe((p)=>{
      const keyword=p.username;
      console.log(songTitle)
      if(keyword){
        if(songTitle==""||songArtist==""){
          this.errorMsg="Song title and artist are required!!!";
        }
        else{
          this.errorMsg="";
          this.httpService.createSong(songTitle,songArtist,albumTitle,year,track,genre).subscribe((song:Song[])=>{
            this.detail=song;
            console.log(song);
            document.getElementById("addSongs").style.display="none";
            document.getElementById("songDetails").style.display="";
            this.successMsg="The song is created successfully!!!";
            this.getSong()
          }),(error:ErrorEvent)=>{
            this.errorMsg=error.error.massage;
          }
        }
      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to add a new song!"
      }
    });
  }
//get review
  submit(songTitle:string,reviews:string, rating:number){
    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      var myDate = new Date();
      var reviewDate=myDate.toLocaleDateString();
      this.httpService.writeReview(username,songTitle,reviewDate,reviews,rating).subscribe((review:Review[])=>{
        this.reviews=review;
        console.log(this.reviews)
      })
    });
    document.getElementById("writeReview").style.display="none";
    this.getReview();
    this.myplaylist();
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
 
  updatePlaylist(listTitle:string,description:string,status:string){
    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      this.httpService.updatePlaylist(listTitle,description,username,status).subscribe((playlist:Playlist[])=>{
      })
      console.log(status)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.successMsg="Successfully modify your playlist!"
      this.myplaylist();
    });
  }

  //add song to the playlist
  addPlaylist(listTitle:string){
    this.searchSong=[];
        for(var i=0;i<this.songs.length;i++){
          this.searchSong[i]=this.songs[i].songTitle;
        }

    this.activatedRoute.queryParams.subscribe((p)=>{
      const username=p.username;
      if(username){
        for(var i=0;i<this.songs.length;i++){
          this.searchSong[i]=this.songs[i].songTitle;
          this.httpService.addSongtoPlaylist(listTitle,username,this.searchSong[i]).subscribe((playlist:Playlist[])=>{
            // this.playlist=playlist;
            console.log(this.searchSong)

          }),(error:ErrorEvent)=>{
            this.errorMsg=error.error.massage;
          }
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          this.successMsg="Successfully add to your playlist!"
          this.myplaylist();

        }
      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to create your own playlist!"
      }
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
      if(username){
        this.httpService.createPlaylist(listTitle,description,username,status).subscribe((playlist:Playlist[])=>{
        }),(error:ErrorEvent)=>{
          this.errorMsg=error.error.massage;
        }
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.successMsg="Successfully create the playlist!"
      }
      else{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.errorMsg="Please sign in to create your own playlist!"
      }
      
    });
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

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
  }

  navigate(username:string){
    this.router.navigate(['/secure'],{
      queryParams:{
        username:username
      }
    });
  }
}
