import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'midepa';
  _modoObscuro = ( localStorage.getItem('mo') === "true" ? true : false );

  cambiarModo(event : any){
    this._modoObscuro = event;
  }

}
