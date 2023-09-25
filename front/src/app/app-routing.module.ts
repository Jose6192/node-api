import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TaskComponent } from './components/tasks/task.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/tasks',
  pathMatch: 'full'
},{
  path: 'signup',
  component: SignupComponent
},{
  path: 'signin',
  component: SigninComponent
},{
  path: 'tasks',
  component: TaskComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
