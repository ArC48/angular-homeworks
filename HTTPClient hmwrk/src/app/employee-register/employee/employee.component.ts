import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
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
    trigger("modalView",[
      transition("void => 0", []),
      transition(":enter, :leave", [
        query(
          "@*", animateChild(),
          {
            limit: 1,
            optional: true
          }
        )
      ]),
      transition("* <=> *", [])
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
