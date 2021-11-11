import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './services/users.service';
import { MustMatch } from './_password/matchPass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  exform!: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService){}

  ngOnInit(){

    this.exform = this.formBuilder.group ({
      'email' : [''],
      'password' : [''],
      'confirm_password' : [''],
      'Nickname' : [''],
      'Phone' : [''],
      'website' : [''],
      'check': [''],
    },
    )
  }
  
  newUser: any;
  id: number = 1;
  
  clicksub(){
    this.newUser={
      email: this.exform.value.email,
      password: this.exform.value.password,
      confirm_pass: this.exform.value.confirm_password,
      nickname: this.exform.value.Nickname,
      phone: this.exform.value.Phone,
      website: this.exform.value.website,
      id: this.id
    }
    this.id++
    this.usersService.users.push(this.newUser)
    this.exform.reset();
  }


  get email(){
    return this.exform.get('email')
  }

  get password(){
    return this.exform.get('password')
  }

  get confirm_pass(){
    return this.exform.get('confirm password')
  }

  get nickname(){
    return this.exform.get('Nickname')
  }

  get phone(){
    return this.exform.get('Phone')
  }

  get website(){
    return this.exform.get('website')
  }
}