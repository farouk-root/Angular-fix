import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { ImsauditComponent } from './imsaudit/imsaudit.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ImsstatusComponent } from './imsstatus/imsstatus.component';
import { ActionsComponent } from './actions/actions.component';
import { Audit2Component } from './audit2/audit2.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'imsstatus/:id',component:ImsstatusComponent},
  //{path:'imsaudit',component:ImsauditComponent},
  {path:'reporting',component:ReportingComponent,canActivate: [AuthGuard]},
  {path:'action/:id',component:ActionsComponent},
  {path:'audit',component:Audit2Component},
 {path:'register',component:RegisterComponent},
 { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
