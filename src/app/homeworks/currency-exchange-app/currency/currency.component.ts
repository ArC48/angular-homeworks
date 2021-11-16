import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  selectValue1Var: string = 'AED';
  selectValue2Var: string = 'AED';

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private http: HttpClient
  ) { }  

    apiKey = '185f5de9b0-5bf1b970fd-r2keo4'
    from: any = 'USD';
    to: any = 'GEL';
    amount: any = 100;
    data: any;
    currencyNames: any
    currencyNamesArray: any = [];
    currencyList: any = [];
    currencyNumber1: any;
    value1: any;
    currencyNumber2: any;
    value2: any;

    getInputValue1(){
      this.currencyNumber2 = (this.currencyNumber1 * this.data[this.selectValue2Var]) / this.data[this.selectValue1Var]

    }

    getInputValue2(){
      this.currencyNumber1 = (this.currencyNumber2 * this.data[this.selectValue1Var]) / this.data[this.selectValue2Var]
    }

    selectValue1(event: any){
      this.selectValue1Var = event.target.value
      this.getInputValue2()
    }

    selectValue2(event: any){
      this.selectValue2Var = event.target.value
      this.getInputValue1()
    }

    // http.get(`https://api.fastforex.io/convert?from=${this.from}&to=${this.to}&amount=${this.amount}&api_key=${this.apiKey}`)
    // .subscribe((data) => {
    //   this.currencyList.push(data)
    //   this.data = data;
    //   this.from = []
    //   this.to = []
    //   this.amount = []
    //   this.from = Object.keys(this.data.base);
    //   this.to = Object.keys(this.data.results);
    //   console.log(Object.keys(this.data.results))
    //   this.amount = this.myForm.controls.value;
    //   console.log(this.amount)
    //   this.from.push(this.from)
    //   this.to.push(this.to)
    // })

    // 1st value * 2nd currency / 1st currency = 2nd value
    // 2nd value * 1st currency / 2nd currency = 1st value

  ngOnInit(): void {
    this.http.get('https://api.fastforex.io/fetch-all?api_key=185f5de9b0-5bf1b970fd-r2keo4')
    .subscribe((data: any) => {
        this.data = data.results;
        this.currencyNames = Object.keys(this.data)
        this.currencyNamesArray.push(this.currencyNames)
      }
    )


    // this.myForm.valueChanges.subscribe( form => {
    //   if(form.input){
    //   this.myForm.patchValue({
    //     input: this.currencyPipe.transform(form.input.replace(/\D/g, '').replace(/^0+/, ''), 'GEL', '', '1.0-0')
    //   }, {emitEvent: false})
    // }
    // })
  
  }
}


