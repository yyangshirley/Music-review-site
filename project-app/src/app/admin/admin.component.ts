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
