import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cliente } from 'src/app/interfaces/cliente/cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { AppState } from '../app.state';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]{1,30}') ] ],
      apellido: ['', [ Validators.required, Validators.pattern('[a-zA-Z ]{1,30}') ] ],
      edad: ['', [ Validators.required, Validators.pattern('^[0-9_]+') ] ],
      fechaNacimiento: ['', [ Validators.required ] ],
    });

    if (this.route.snapshot.paramMap.get("clienteId") !== null) {
      const clienteId = this.route.snapshot.paramMap.get("clienteId");
      console.log('clienteId:');
      console.log(clienteId);
      this.store.select(state => state.cliente).subscribe(data => {
        console.log('listaClientes store');
        console.log(data);
        if (data) {
          const usuario = data.find(dat => dat.key == clienteId);
          this.form.setValue({nombre: usuario.nombre, 
            apellido: usuario.apellido, edad: usuario.edad, 
            fechaNacimiento: usuario.fechaNacimiento});
        }
      });
    }
  }

  actualizar() {
    console.log('editar!')
    if (this.form.valid) {
      const { nombre, apellido, edad, fechaNacimiento } = this.form.value;
      const cliente: Cliente = {
        nombre, apellido, edad, fechaNacimiento
      };
      console.log('Editar usuario:');
      console.log(cliente);
      this.cargando = true;
      this.clienteService.create(cliente).then(() => {
        this.cargando = false;
        this.form.reset();
        this.router.navigate(['/cliente']);
      });
    }
  }

}
