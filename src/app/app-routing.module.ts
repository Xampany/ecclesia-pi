import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'leds',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: ':index',
        component: DetailComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'leds'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
