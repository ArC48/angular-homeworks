import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './user-dashboard-interface';

@Component({
  selector: 'app-main-user',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UsermainComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  employeesOBJ: EmployeeModel = new EmployeeModel();

  employeeData : EmployeeModel[] = []

  showAdd !: boolean
  showUpdate !: boolean

  constructor(private fb: FormBuilder, private _apiService: ApiService) { 
  
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',[Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]],
      salary: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
      age: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
      email: ['',[Validators.required, Validators.required]],
      password: ['',[Validators.required,Validators.required]],
    })

  }

  Post_Employees_To_Server(){
    this.employeesOBJ.name = this.form.value.name;
    this.employeesOBJ.salary = `${this.form.value.salary}`;
    this.employeesOBJ.age = `${this.form.value.age}`;
    
    this._apiService.Send_Data_To_Server(this.employeesOBJ)
    .subscribe(res =>{
      let cancel = document.getElementById('cancel')
      cancel?.click();
      this._apiService.Get_Data_From_Server()
      .subscribe(response =>{
        this.employeeData = response
      })
      this.form.reset();  
    },
    error =>{
      alert('Operation failed, try again')
    })
  }

  update(employee: EmployeeModel){
    this.employeesOBJ.id = employee.id
    this.form.controls['name'].setValue(employee.name)
    this.form.controls['salary'].setValue(employee.salary)
    this.form.controls['age'].setValue(employee.age)
    this.form.controls['email'].setValue(employee.email)
    this.form.controls['password'].setValue(employee.password)
    this.showAdd = false;
    this.showUpdate = true;
  }
  Update_Employees_To_Server(){
    this.employeesOBJ.name = this.form.value.name;
    this.employeesOBJ.salary = `${this.form.value.salary}`;
    this.employeesOBJ.age = `${this.form.value.age}`;
    this.employeesOBJ.email = `${this.form.value.email}`;
    this.employeesOBJ.password = `${this.form.value.password}`;
    this._apiService.Update_Data_to_server(this.employeesOBJ,this.employeesOBJ.id).subscribe(res=>{
      let cancel = document.getElementById('cancel')
      cancel?.click();
      this._apiService.Get_Data_From_Server()
      .subscribe(response =>{
        this.employeeData = response
      })
      this.form.reset();  
      
    })
  }

  click_add(){
    this.form.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}