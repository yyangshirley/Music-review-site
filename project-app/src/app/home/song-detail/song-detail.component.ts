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
 
  getReviews(title:string){
    this.errorMsg="";

      this.httpService.reviewDetail(title).subscribe((review:Review[])=>{
        this.reviews=review;
        console.log(this.reviews)
      }),(error:ErrorEvent)=>{
        this.errorMsg=error.error.massage;
      }
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
  
