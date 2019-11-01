import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Esta funcion existe en /assets/js/customs.js
// permite llamar de cualquier script que se encuntre fuera de angular
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate(['/dashboard']);
  }

}
