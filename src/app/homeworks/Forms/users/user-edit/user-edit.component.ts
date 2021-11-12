import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_password/matchPass';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  exform: any;
  @Input() currentPerson: any;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.exform = this.formBuilder.group ({
      'email' : ['', [Validators.required,
        Validators.email]],
      'password' : ['', 
      [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[a-z][a-z0-9]*$/i)]],
      'confirm_password' : ['', [Validators.required]],
      'nickname' : ['', [Validators.required,
        Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      'phone' : ['', [Validators.required,
        Validators.pattern(/^\+380 ?[0-9]{9}$/)]],
      'website' : ['', [Validators.required, Validators.pattern(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)]],
    },
      { validator: MustMatch('password', 'confirm_password')}
    )

    this.exform.patchValue({
      email: this.currentPerson.email,
      password: this.currentPerson.password,
      confirm_password: this.currentPerson.confirm_pass,
      nickname: this.currentPerson.nickname,
      phone: this.currentPerson.phone,
      website: this.currentPerson.website,
    }) 
  }

  get email(){
    return this.exform.get('email')
  }

  get password(){
    return this.exform.get('password')
  }

  get confirm_pass(){
    return this.exform.get('confirm_password')
  }

  get nickname(){
    return this.exform.get('nickname')
  }

  get phone(){
    return this.exform.get('phone')
  }

  get website(){
    return this.exform.get('website')
  }

  updatedUser: any;
  onEdit(){
    this.updatedUser = ({id: this.currentPerson?.id, ...this.exform.value});
    this.usersService.users = this.usersService.users.map((user: any) => {
      return user.id === this.currentPerson.id? this.updatedUser: user;
    });
    this.usersService.currentSubject.next();
    this.usersService.updateNeeded.next();
  }
  onCancel(){
    this.currentPerson = null;
    this.usersService.currentSubject.next();
  }
}


