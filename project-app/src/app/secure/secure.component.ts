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

  
