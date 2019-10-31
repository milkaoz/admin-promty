import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( public ajustesService: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck(link);

    this.ajustesService.aplicaTema(tema);

  }

  aplicarCheck( link: any ) {

    // Busca los elementos "selector" en <a #link4 class="selector blue-theme">4</a>
    // para luego remplazar el selector del "tema" en la pagina index.html (head)

    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores) {

      // Saca el estilo 'working' de la lista
      ref.classList.remove('working');
    }

    // Aqui agrego el estilo 'working' .
    link.classList.add('working');

  }

  colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.ajustesService.ajustes.tema;
    for ( const ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
