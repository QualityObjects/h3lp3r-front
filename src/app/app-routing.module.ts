import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HashFormComponent } from './ui/hash-form/hash-form.component';
import { BaseEncodingFormComponent } from './ui/base-encoding-form/base-encoding-form.component';
import { RandomNumberFormComponent } from './ui/random-number-form/random-number-form.component';
import { RandomNamesFormComponent } from './ui/random-names-form/random-names-form.component';
import { OracleQuestionFormComponent } from '@appui/oracle-question-form/oracle-question-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'hash/:alg', component: HashFormComponent },
    { path: 'oracle', component: OracleQuestionFormComponent },
    { path: 'random/:num_type', component: RandomNumberFormComponent },
    { path: 'random-names', component: RandomNamesFormComponent },
    { path: 'base64/:action', component: BaseEncodingFormComponent }
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
