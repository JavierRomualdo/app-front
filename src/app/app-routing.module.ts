import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './modules/custom-layout/custom-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: '',
        //canActivateChild: [AccessServiceGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'cliente',
        //canActivateChild: [AccessServiceGuard],
        loadChildren: () =>
          import('./cliente/cliente.module').then(
            (m) => m.ClienteModule
          ),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
