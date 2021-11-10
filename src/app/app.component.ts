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
      'confirm password' : ['', [Validators.required]],
      'Nickname' : ['', [Validators.required,
        Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      'Phone' : ['', [Validators.required,
        Validators.pattern(/^\+380 ?[0-9]{9}$/)]],
      'website' : ['', [Validators.required, Validators.pattern(
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]|www\.[a-zA-Z0-9]+\.[^\s])/gi
            )]],
      'check': ['', [Validators.required]],
    },
      { validator: MustMatch('password', 'confirm password')}
    )
  }
}