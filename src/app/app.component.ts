import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_password/matchPass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  exform!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){

    this.exform = this.formBuilder.group ({
      'email' : ['', [Validators.required,
        Validators.email]],
      'password' : ['', 
      [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[a-z][a-z0-9]*$/i)]],
      'confirm_password' : ['', [Validators.required]],
      'Nickname' : ['', [Validators.required,
        Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      'Phone' : ['', [Validators.required,
        Validators.pattern(/^\+380 ?[0-9]{9}$/)]],
      'website' : ['', [Validators.required, Validators.pattern(
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]|www\.[a-zA-Z0-9]+\.[^\s])/gi
            )]],
      'check': ['', [Validators.required]],
    },
      { validator: MustMatch('password', 'confirm_password')}
    )
  }
  newUser: any;
  
  clicksub(){
    this.newUser={
      email: this.exform.value.email,
      password: this.exform.value.password,
      confirm_pass: this.exform.value.confirm_password,
      nickname: this.exform.value.Nickname,
      phone: this.exform.value.Phone,
      website: this.exform.value.website
    }
    console.log(this.newUser);
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