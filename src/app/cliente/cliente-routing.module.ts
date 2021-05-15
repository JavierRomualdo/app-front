import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';
import { ClienteNuevoComponent } from './cliente-nuevo/cliente-nuevo.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {
    path: "",
    component: ClienteComponent
  },
  {
    path: "nuevo",
    component: ClienteNuevoComponent
  },
  {
    path: "nuevo",
    component: ClienteNuevoComponent
  },
  {
    path: ':clienteId',
    component: ClienteEditarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
