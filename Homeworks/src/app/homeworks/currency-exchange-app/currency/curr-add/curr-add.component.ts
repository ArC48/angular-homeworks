import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tap} from "rxjs/operators";

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
  sum: any;
  toCurr: string = 'GEL';
  convertedValue: number | null = null;


  get currencies(): FormArray{
    return this.myForm.get('currencies') as FormArray;
  }

  addClicked(){
      this.currencies.push(this.fb.group({input: 1, select: 'USD'}))
      console.log(this.myForm.get('currencies'))
    }

  clickedDelete(idx: number){
    this.currencies.removeAt(idx);
  }

  constructor(private fb: FormBuilder,
            private http: HttpClient) {}

  apiKey = '4995da5ba9-9952134688-rb01ff' // valid for a few weeks only

  ngOnInit(): void {
    this.http.get(`https://api.fastforex.io/fetch-all?api_key=${this.apiKey}`)
      .subscribe((data: any) => {
        this.data = data.results;
        this.currencyNames = Object.keys(this.data)
      }
    )

    this.myForm = this.fb.group({
        currencies: this.fb.array(
          [this.fb.group({
            select: ['EUR', Validators.required],
            input: [0, Validators.required],
          })
          ]),
        select2: ['GEL']
      }
    );
    this.myForm?.valueChanges.pipe(
      tap(() => {
        this.toCurr = this.myForm.get('select2')?.value;
        for (const formGroup of this.currencies.controls) {
          this.calculateSum(formGroup.get("select")?.value, formGroup.get("input")?.value);
        }
      })
    ).subscribe()

    this.myForm.get("select2")?.valueChanges.pipe(
      tap(() => {
        this.toCurr = this.myForm.get('select2')?.value;
      })
    ).subscribe()
  }


  calculateSum(currency: string, amount: number) {
    this.sum = 0;
    if (amount != 0) {
      this.http.get(`https://api.fastforex.io/convert?from=${currency}&to=${this.toCurr}&amount=${amount}&api_key=${this.apiKey}`)
        .subscribe((data: any) => {
            this.convertedValue = data.result[Object.keys(data.result)[0]];
            typeof this.convertedValue === 'number' ? this.sum += this.convertedValue : this.sum;
          }, () => console.log('HTTP Error'),
        );
    }
  }
}