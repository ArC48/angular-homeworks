import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

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
        'email' : [''],
        'password' : [''],
        'confirm_password' : [''],
        'Nickname' : [''],
        'Phone' : [''],
        'website' : [''],
    },
    )

    this.exform.patchValue({
      email: this.currentPerson.email,
      password: this.currentPerson.password,
      confirm_password: this.currentPerson.confirm_pass,
      Nickname: this.currentPerson.nickname,
      Phone: this.currentPerson.phone,
      website: this.currentPerson.website
    }) 
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

  updatedUser: any;
  onEdit(){
    this.updatedUser = ({id: this.currentPerson?.id, ...this.exform.value});
    this.usersService.users = this.usersService.users.map((user: any) => {
      return user.id === this.currentPerson.id? this.updatedUser: user;
    })
  }
  onCancel(){
    this.currentPerson = null;
    this.usersService.currentSubject.next();
  }
}

