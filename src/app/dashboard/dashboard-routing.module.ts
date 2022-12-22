import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutasHijas)],
  exports: [RouterModule],
  declarations: [],
  bootstrap: [],
})
export class DashboardRoutingModule {}
