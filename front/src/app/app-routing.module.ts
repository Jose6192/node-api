import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TaskComponent } from './components/tasks/task.component';
import { ReportFormComponent } from './components/report-form/report-form.component'
import { TechnicalFormComponent } from './components/technical-form/technical-form.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [{
  path: '',
  redirectTo: 'tasks',
  pathMatch: 'full'
},{
  path: 'signup',
  component: SignupComponent,
  canActivate: [AuthGuard]
},{
  path: 'signin',
  component: SigninComponent
},{
  path: 'tasks',
  component: TaskComponent,
  canActivate: [AuthGuard]
},{
  path: 'report-form',
  component: ReportFormComponent,
},{
  path: 'technical-form',
  component: TechnicalFormComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
