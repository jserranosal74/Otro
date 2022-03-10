import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.css']
})
export class DesarrollosComponent implements OnInit {
  tipoPropiedad = '';

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    //console.log('ngOnInit');

    this._activatedRoute.params.subscribe((routeParams) => {
      //console.log(routeParams);
      this.tipoPropiedad = `${routeParams['tipo']}`;
    });

    //console.log(this._activatedRoute.snapshot.params);
  }
}
