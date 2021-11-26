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


    token: boolean = false

    constructor(private http: HttpClient, private router: Router){}

    rightToActive(){
        return this.token
    }

    login(form: any){
        this.http.get<any>('http://localhost:3000/data')
        .subscribe(res=>{
        const user = res.find((a:any)=>{
            return a.email === form.email && a.password === form.password
        });
        if(user){
            this.token = true
            this.loggedUser = user
            this.router.navigate(['user-main'])
        }else if(!user){
            alert('User Does not Exist!')
        }
        },err=>{
            alert('something went wrong, try again')
        })
        
    }
}
