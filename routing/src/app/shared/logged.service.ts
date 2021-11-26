import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class loggedService{
    loggedUser: any
    public loginForm!: FormGroup


    constructor(private http: HttpClient, private router: Router){}

    login(form:any){
        this.http.get<any>('http://localhost:3000/data')
        .subscribe(res=>{
        const user = res.find((a:any)=>{
            return a.email === this.loginForm.value.email &&
        a.password === this.loginForm.value.password
        });
        if(user){
        this.loggedUser = user
        this.loginForm.reset();
        this.router.navigate(['user-main'])
        }
    },err=>{
        alert('something went wrong, try again')
    })
    }
}