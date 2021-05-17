import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente/cliente';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clienteListSubscription: Subscription;
  clienteStoreSubscription: Subscription;
  listaClientes: Cliente[] = [];
  listaClientesStore: Cliente[] = [];
  promedio: number = 0;
  desviacionEstandar: number = 0;
  cargando: boolean = false;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private store: Store<AppState>
  ) {
    this.clienteStoreSubscription = this.store.select(state => state.cliente).subscribe(data => {
      console.log('listaClientes clientes store');
      console.log(data);
      this.listaClientesStore = data ?? [];
      
      if (this.listaClientesStore.length > 0) {
        this.listaClientes = data;
      } else {
        this.listarClientes();
      }
    });
  }

  ngOnInit(): void {
    
  }

  listarClientes() {
    // peticion
    this.cargando = true;
    this.clienteListSubscription = this.clienteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.listaClientes = data;
      this.listaClientes.length > 0 && this.getCalcular();
      console.log('Lista clientes listar:');
      console.log(this.listaClientes);

      if (this.listaClientesStore.length>0) {
        this.addAllStore(this.listaClientes);
      }
      // if (data.length != this.listaClientesStore.length) {
      //   data.forEach(d => this.addStore(d));
      // }
      this.cargando = false;
    });
  }

  getCalcular() {
    let suma = 0;
    this.listaClientes.forEach(cliente => {
      suma += cliente.edad;
    });
    this.promedio = suma/this.listaClientes.length;
  }

  // editar(key: string) {
  //   console.log('Editar cliente: '+key);
  //   this.router.navigate(['/cliente/'+key]);
  // }

  eliminarCliente(cliente: Cliente) {
    console.log('Eliminar cliente: '+cliente.key);
    this.clienteService.delete(cliente.key)
      .then(() => {
        this.deleteStore(cliente);
      })
      .catch(err => console.log(err));
  }

  addAllStore(cliente: Cliente[]) {
    this.store.dispatch({
      type: 'ADD_ALL_CLIENT',
      payload: <Cliente[]> cliente
    });
  }

  deleteStore(cliente: Cliente) {
    this.store.dispatch({
      type: 'DELETE_CLIENT',
      payload: <Cliente> cliente
    });
  }

  ngOnDestroy(): void {
    // this.clienteListSubscription.unsubscribe();
    this.clienteStoreSubscription.unsubscribe();
  }

}
