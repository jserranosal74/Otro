import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rentar',
  templateUrl: './rentar.component.html',
  styleUrls: ['./rentar.component.css'],
})
export class RentarComponent implements OnInit {
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
