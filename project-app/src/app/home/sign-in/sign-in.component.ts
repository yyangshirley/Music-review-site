import { Component, OnInit } from '@angular/core';
import { NgForm }  from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;

  model:User={
    username:'',
    password:'',
    status:'',
      privilege:''
  };

  socialUser:SocialUser;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  Msg: string;
  loggedId: boolean;
  status:string;
  constructor(
    private userService:UserService,
    private router:Router,
    private authService:AuthService,
    private httpService:HttpService) {
     }
  
  onSubmit(form : NgForm){
    this.Msg="";
    const username=form.controls["username"].value

    this.httpService.checkUser(username).subscribe((user:User[])=>{
      this.status=user[0].status;
      if(this.status=="deactivated"){
        this.Msg="Your account is deactivated! Please contact the site manager (yyan496@uwo.ca)";
        this.resetForm(form);

      }
      else{
        this.userService.login(form.value).subscribe(
          res => {
            this.userService.setToken(res['token']);
            console.log(username)
            this.navigate(username);
          },
          err => {
            console.log(err);
    
            this.Msg = err.error.message;
           
            if(this.Msg=="Email is not registered"){
              console.log("2")
              this.Msg="The user has not registered!!!"
              this.resetForm(form);
            }
            if(this.Msg=='Please verify your email'){
              console.log("1")
              this.Msg='You have registered!!! Please verify your email!!!';
              this.resetForm(form);
            }
            else{
              this.Msg="Please enter the correct password!!!";
              this.resetForm(form);
            }
          }
        );
      }
    })     
  }
 
  navigate(username:string){
    this.router.navigate(['/secure'],{
      queryParams:{
        username:username
      }
    });
  }

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

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      username: '',
      password: '',
      status:'',
      privilege:''
    };
    form.resetForm();
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    // this.authService.authState.subscribe((socialUser)=>{
    //   this.socialUser=socialUser;
    //   this.loggedId=(socialUser!=null);
    // })
  }

}
