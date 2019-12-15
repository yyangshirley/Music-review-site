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
 
