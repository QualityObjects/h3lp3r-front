import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HashFormComponent } from './ui/hash-form/hash-form.component';
import { BaseEncodingFormComponent } from './ui/base-encoding-form/base-encoding-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'hash/:alg', component: HashFormComponent },
    { path: 'random/:num_type', component: DashboardComponent },
    { path: 'random-names', component: DashboardComponent },
    { path: 'base64/:action', component: BaseEncodingFormComponent }
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
