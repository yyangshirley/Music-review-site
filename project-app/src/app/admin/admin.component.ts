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
