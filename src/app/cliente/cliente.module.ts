import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteNuevoComponent } from './cliente-nuevo/cliente-nuevo.component';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';


@NgModule({
  declarations: [ClienteComponent, ClienteNuevoComponent, ClienteEditarComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
