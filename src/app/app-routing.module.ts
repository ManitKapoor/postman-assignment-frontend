import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { RoleGuardService } from './services/role-guard/role-guard.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '404', component: NotfoundComponent },
  { 
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuardService] 
  },{ 
    path: 'assignment',
    component: AssignmentComponent,
    canActivate: [RoleGuardService],
    data: {role: 'assignment'}
  },{ 
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
