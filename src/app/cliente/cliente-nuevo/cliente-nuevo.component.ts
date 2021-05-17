import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cliente } from 'src/app/interfaces/cliente/cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { AppState } from '../app.state';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrls: ['./cliente-nuevo.component.css']
})
export class ClienteNuevoComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]{1,30}') ] ],
      apellido: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]{1,30}') ] ],
      edad: ['', [ Validators.required, Validators.pattern('^[0-9_]+') ] ],
      fechaNacimiento: ['', [ Validators.required ] ],
    });
  }

  guardar() {
    console.log('nuevo!')
    if (this.form.valid) {
      const { nombre, apellido, edad, fechaNacimiento } = this.form.value;
      const cliente: Cliente = {
        nombre, apellido, edad, fechaNacimiento
      };
      console.log('Nuevo usuario:');
      console.log(cliente);
      this.cargando = true;
      this.clienteService.create(cliente).then((cliente) => {
        this.cargando = false;
        this.form.reset();
        console.log('Cliente guardado!')
        console.log(cliente);
        this.router.navigate(['/cliente']);
      });
    }
  }

  saveStore(cliente: Cliente) {
    this.store.dispatch({
      type: 'ADD_PRODUCT',
      payload: <Cliente> {
        key: cliente.key,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        edad: cliente.edad,
        fechaNacimiento: cliente.fechaNacimiento
      }
    });
  }

  ngOnDestroy(): void {
  }

}
