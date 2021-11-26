import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsermainComponent } from './user-main/user-main.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user-main', component: UsermainComponent, canActivate: []},
  {path: '', redirectTo: 'login', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
