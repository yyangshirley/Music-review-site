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

