  loginWithGoogle():void{
    this.loggedId=false;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((socialUser)=>{
      this.socialUser=socialUser;
      this.loggedId=(socialUser!=null);
    })
    if(this.loggedId){
      this.navigate(this.socialUser.email)
    }
  }

  googlesignOut(): void {
    this.authService.signOut();

  }

