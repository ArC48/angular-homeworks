import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { loggedService } from '../shared/logged.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  public log!: loggedService
  wrongInput!: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authentification: loggedService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email':['', [Validators.required,
        Validators.email]],
      'password':['', 
      [Validators.required]]
    })
  }

  login(){
    if(this.loginForm.valid){     
      this.authentification.login(this.loginForm.value)
    this.loginForm.reset()
    }
}

get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }
}
