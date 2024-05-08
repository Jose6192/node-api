import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TaskComponent } from './components/tasks/task.component';
import { ReportFormComponent } from './components/report-form/report-form.component'
import { TechnicalFormComponent } from './components/technical-form/technical-form.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './auth.guard';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'report-form',
  pathMatch: 'full'
},{
  path: 'signup',
  title: 'Gestor de infraestructura',
  component: SignupComponent,
  canActivate: [AuthGuard]
},{
  path: 'signin',
  component: SigninComponent
},{
  path: 'tasks',
  title: 'Gestor de infraestructura',
  component: TaskComponent,
  canActivate: [AuthGuard]
},{
  path: 'report-form',
  title: 'Reportes UT',
  component: ReportFormComponent,
},{
  path: 'technical-form',
  title: 'Gestor de infraestructura',
  component: TechnicalFormComponent,
  canActivate: [AuthGuard]
},{
  path: 'task-history',
  title: 'Gestor de infraestructura',
  component: TaskHistoryComponent,
  canActivate: [AuthGuard]
},{
  path: 'statistics',
  title: 'Gestor de infraestructura',
  component: StatisticsComponent,
},
{
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
