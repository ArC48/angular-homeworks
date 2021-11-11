import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = this.usersService.users;
  currentPerson: any;
  constructor(private usersService: UsersService) { 
    this.usersService.currentSubject.subscribe(()=>{
      this.currentPerson = null;
    });
  }

  ngOnInit(): void {
  }
  updatedUser: any;

  edit(id: any){
    this.currentPerson = this.users.filter((user: any)=>{
      return user.id === id;
    })[0];
  }

  delete(id: any){

  }

}
