import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';



// Esta funcion existe en /assets/js/customs.js
// permite llamar de cualquier script que se encuntre fuera de angular
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    ) { }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup) => {

      const valor1 = group.controls[campo1].value;
      const valor2 = group.controls[campo2].value;
      if ( valor1 === valor2 ) {
        return null;
      }
      return {
        sonIguales: true
      };


    };
  }

  ngOnInit() {
    init_plugins();
    // TODO: repasar conceptos (FormGroup, FormControl)
    this.forma = new FormGroup({
      nombre : new FormControl( null, Validators.required ),
      correo : new FormControl( null, [Validators.required, Validators.email] ),
      password1 : new FormControl( null, Validators.required ),
      password2 : new FormControl( null, Validators.required ),
      condiciones : new FormControl( false),
    }, { validators: this.sonIguales( 'password1', 'password2' ) });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test1@test.cl',
      password1: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    // console.log('Registar Usuario: ', this.forma.value);
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password1
    );

    this.usuarioService.crearUsuario(usuario)
    .subscribe( resp => {
      console.log( resp );
      this.router.navigate(['/login']);
    });
  }


}
