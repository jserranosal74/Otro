import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css'],
})
export class ComprarComponent implements OnInit {
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