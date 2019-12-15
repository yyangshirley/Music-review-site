import { Component, OnInit } from '@angular/core';
import { NgForm }  from '@angular/forms';
import { UserService } from '../../home/shared/user.service';
import { User } from '../../home/shared/user.model';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {
  model:User={
    username:'',
    password:'',
    status:'',
    privilege:''
  };

  Msg: string;
  loggedId: boolean;
  status:string;
  public privilege:string;

  constructor(
    private userService:UserService,
    private router:Router,
    private authService:AuthService,
    private httpService:HttpService) { }

  ngOnInit() {
  }

    onSubmit(form : NgForm){
      this.Msg="";
      const username=form.controls["username"].value;

      this.httpService.checkUser(username).subscribe((user:User[])=>{
        this.privilege=user[0].privilege;
        console.log(this.privilege)
        if(this.privilege=="sm"){
          this.userService.login(form.value).subscribe(
            res => {
              this.userService.setToken(res['token']);
              this.navigate(username);
            },
            err => {
              console.log(err);
              this.Msg = err.error.message;
              this.resetForm(form);  
            }
          );
        }
        else{
          this.Msg="Your do not have privilege to sign in as Site Manager!";
          this.resetForm(form);  
        }  
      })
      this.status="";
      this.privilege="";
    }
    
    getStatus(username:string){
      this.httpService.checkUser(username).subscribe((user:User[])=>{
        this.status=user[0].status;
      })    
    }

    getPrivilege(username:string){
      this.httpService.checkUser(username).subscribe((user:User[])=>{
        this.privilege=user[0].privilege;
        console.log(this.privilege)
      })
    }

    navigate(username:string){
      this.router.navigate(['/admin'],{
        queryParams:{
          username:username
        }
      });
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
}
