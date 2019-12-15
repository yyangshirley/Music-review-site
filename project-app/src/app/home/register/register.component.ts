import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  errorMsg:string;
  successMsg:boolean;
  successFlag:string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.successMsg = true;
        this.successFlag=`Now you can verify your email address!!!`;
        setTimeout(() => this.successMsg = false, 4000);
        this.resetForm(form);
        this.errorMsg="";
      },
      err => {
        if (err.status === 422) {
          this.errorMsg = err.error.join('<br/>');
        }
        if(err.status===400){
          this.errorMsg = "This email has been registered!!! Please sign in or use another email";
          this.resetForm(form);
        }
        else
          this.errorMsg = 'Oops! Something went wrong.Please contact administrator.';
      }
    );
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
