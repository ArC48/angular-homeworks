import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentTimeService {

  constructor() { }
  todayDate(){
    let curDate = new Date();
    return curDate;
  }
}
