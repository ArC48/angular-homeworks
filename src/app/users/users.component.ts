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
    this.usersService.updateNeeded.subscribe(() => {
      this.users = this.usersService.users;
    })
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
    this.usersService.users = this.usersService.users.filter((user: any) => user.id !== id)[0];
    this.usersService.updateNeeded.next();
  }
}
