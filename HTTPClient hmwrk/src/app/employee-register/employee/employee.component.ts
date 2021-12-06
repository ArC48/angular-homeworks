import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeModel } from '../employee-dashboard-interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations:[
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate(2000))
    ]),
    trigger('customAnimation',[
      state('a', style({
        height: '100px',
        width: '100px'
      })),
      state('b', style({
        display: 'none'
      })),
      transition('a => b', animate(0)),
      transition('b => a', animate(0))
    ]),
    trigger('popupAnimation ',[
      state('open', style({
        height: '100px',
        width: '200px'
      })),
      state('closed', style({
        display: 'none'
      })),
      transition('open => closed', animate(2000)),
      transition('closed => open', animate(2000))
    ])
  ]
})
export class EmployeeComponent implements OnInit {

  @Input() EmployeeData: EmployeeModel[] = []
  @Output() employee =  new EventEmitter<EmployeeModel>();


  // --- pagination ---//
  page: number = 1;
  itemPerPages: number = 8;
  private employeee: any

  constructor(private _api: ApiService) { }

  public currentState = 'b'
  public changeStyle():void{
    this.currentState = this.currentState === 'a' ? 'b' : 'a'
  }


  ngOnInit(): void {
    this.getAllEmploee()
  }

  getAllEmploee(){
    this._api.Get_Data_From_Server()
    .subscribe(res=>{
      this.EmployeeData = res

    })
  }


  delete_from_server(employee: EmployeeModel){
  this.employeee = employee
  }

  delete(){
    this._api.Delete_Data_To_Server(this.employeee.id)
      .subscribe(res=>{
        this.getAllEmploee()
        let dismiss = document.getElementById('dismiss')
        dismiss?.click();
    })
  }

  Edit_Employee(employee: EmployeeModel){
    this.employee.emit(employee)
  }

}
