import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any = [];
  newUser = new Subject<any>();
  currentSubject = new Subject<any>();
  updateNeeded = new Subject<any>();


  constructor() { }
}
