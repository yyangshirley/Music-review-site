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
