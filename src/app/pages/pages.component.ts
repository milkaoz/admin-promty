import { Component, OnInit } from '@angular/core';

// Esta funcion existe en /assets/js/customs.js
// permite llamar de cualquier script que se encuntre fuera de angular
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    init_plugins();
  }

}
