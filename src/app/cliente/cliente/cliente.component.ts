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
  // clienteStoreSubscription: Subscription;
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
    // this.clienteStoreSubscription = this.store.select(state => state.cliente).subscribe(data => {
    //   this.listaClientesStore = data ?? [];
    //   console.log('listaClientes clientes store');
    //   console.log(data);
    //   if (this.listaClientesStore.length > 0) {
    //     this.listaClientes = data;
    //   } else {
    //     this.listarClientes();
    //   }
    // });
    this.listarClientes();
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
      console.log('Lista clientes:');
      console.log(this.listaClientes);
      // if (data.length != this.listaClientesStore.length) {
      //   data.forEach(d => this.addStore(d));
      // }
      this.cargando = false;
    });    
  }

  addStore(cliente: Cliente) {
    this.store.dispatch({
      type: 'ADD_CLIENT',
      payload: <Cliente> {
        key: cliente.key,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        edad: cliente.edad,
        fechaNacimiento: cliente.fechaNacimiento
      }
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

  eliminarCliente(key: string) {
    console.log('Eliminar cliente: '+key);
    this.clienteService.delete(key)
      .then(() => this.listarClientes())
      .catch(err => console.log(err));
  }

  ngOnDestroy(): void {
    // this.clienteListSubscription.unsubscribe();
    // this.clienteStoreSubscription.unsubscribe();
  }

}
