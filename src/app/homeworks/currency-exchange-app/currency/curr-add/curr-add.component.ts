import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-curr-add',
  templateUrl: './curr-add.component.html',
  styleUrls: ['./curr-add.component.css']
})
export class CurrAddComponent implements OnInit {
  public myForm!: FormGroup;
  data: any;
  currencyNames: any;
  currencyNamesArray: any;

  get currencies(): FormArray{
    return this.myForm.get('currencies') as FormArray;
  }

  addClicked(){
      this.currencies.push(this.fb.group({input: 1, select: 'USD'}))
      console.log(this.myForm)
    }

  clickedDelete(idx: number){
    this.currencies.removeAt(idx);
  }

  constructor(private fb: FormBuilder,
            private http: HttpClient) {}

  ngOnInit(): void {
        this.http.get('https://api.fastforex.io/fetch-all?api_key=185f5de9b0-5bf1b970fd-r2keo4')
    .subscribe((data: any) => {
        this.data = data.results;
        this.currencyNames = Object.keys(this.data)
      }
    )
    this.myForm = this.fb.group({
      currencies: this.fb.array([
        this.fb.group({input: 1, select: 'USD'}),
        this.fb.group({input: 1, select: 'GEL'}),
      ])
    })
}
}

