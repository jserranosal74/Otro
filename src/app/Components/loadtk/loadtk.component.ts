import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loadtk',
  templateUrl: './loadtk.component.html',
  styleUrls: ['./loadtk.component.css']
})
export class LoadtkComponent implements OnInit {
  info : string = '';

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.info = this._activatedRoute.snapshot.params['info'];
    });

    this.cargarInfo();
  }

  ngOnInit(): void {
  }

  cargarInfo(){
    localStorage.setItem('usuario', this.info);
    window.location.href = '/inicio';
  }

}
