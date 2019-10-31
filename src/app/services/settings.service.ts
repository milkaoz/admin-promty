import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl : 'assets/css/colors/default.css',
    tema : 'default'
  };

  constructor( @Inject(DOCUMENT) private document ) {
    this.cargarAjustes();
   }

  guardarAjustes() {

    console.log('guarda Localstorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {

      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
      console.log('carga del localStorage');

    } else {

      console.log('Usando valores por defecto');
    }
    this.aplicaTema( this.ajustes.tema );
  }

  aplicaTema( tema: string ) {

    const url = `assets/css/colors/${ tema }.css`;
    this.document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
