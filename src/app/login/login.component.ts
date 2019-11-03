import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';
import { URL_SERVICIOS } from '../config/config';

// Esta funcion existe en /assets/js/customs.js
// permite llamar de cualquier script que se encuntre fuera de angular
declare function init_plugins();
// defino la libreria de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
    ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    // Si no hay un correo en el localStorage, carga el campo con vacio
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      // Documentacion de referencia:  https://developers.google.com/identity/sign-in/web/listeners
      this.auth2 = gapi.auth2.init({
        client_id: '918527039139-9od22l4ssik5a0185fcv8asufe280pvq.apps.googleusercontent.com',
        cookiepolicy: 'simple_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }


  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle( token )
      .subscribe( () => window.location.href = '#/dashboard' );
      console.log(token);
    });
  }

  ingresar( forma: NgForm ) {

    // Valido el formulario, si no es valid sale de la funcion
    if ( forma.invalid ) {
      console.log( 'Formulario invalido' );
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password);
    this.usuarioService.login( usuario, forma.value.recuerdame)
    .subscribe( correcto => this.router.navigate(['/dashboard']) );
    // susbcribe ejecuta la funcion

  }

}
