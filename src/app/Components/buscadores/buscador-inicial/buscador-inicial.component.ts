import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedad.model';
import { ubicacion } from 'src/app/Models/procesos/ubicacion.model';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';
import { UbicacionesService } from 'src/app/Services/Procesos/ubicaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscador-inicial',
  templateUrl: './buscador-inicial.component.html',
  styleUrls: ['./buscador-inicial.component.css'],
})
export class BuscarComponent implements OnInit {
  formaBuscar = this.fb.group({});

  _tiposPropiedad : tipoPropiedad[] = [];
  _rentaVentaDesarrolloRemate : number | null = 0;
  _ubicaciones : ubicacion[] = [];

  constructor( private fb: FormBuilder,
               private _activatedRoute: ActivatedRoute,
               private _ubicacionesService: UbicacionesService,
               private _tiposPropiedadService: TiposPropiedadService ) {

    this.obtenerTiposPropiedad();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formaBuscar = this.fb.group({
      tipoOperacion : ['', [Validators.required] ],
      tipoPropiedad : ['', [Validators.required] ],
      ubicacion     : [''],
    });
  }

  limpiarFormulario(){
    this.formaBuscar.reset({
      tipoOperacion : '',
      tipoPropiedad : '',
      ubicacion     : ''
    });
    
  }

  obtenerTiposPropiedad(){
    // console.log(this.loading);
    this._tiposPropiedadService.getTiposPropiedades().subscribe((data) => {
      this._tiposPropiedad = data;

      this.formaBuscar.patchValue({
        tipoOperacion : 2,
        tipoPropiedad : 1,
        asentamiento  : ''
      });

      this._rentaVentaDesarrolloRemate = 2;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 409:
            break;
        }

      });
  }

  seleccionarOperacion(){
    debugger;
    this._rentaVentaDesarrolloRemate = this.formaBuscar.controls['tipoOperacion'].value;

    // this.formaBuscar.patchValue({
    //   tipoPropiedad : '1'
    // });

  }

  obtenerUbicaciones(){
    //debugger;
    //console.log(this.formaBuscar.get('ubicacion')?.value);
    this._ubicacionesService.getUbicaciones(this.formaBuscar.get('ubicacion')?.value).subscribe((data) => {

      this._ubicaciones = [];

      data.forEach(item=>{
        this._ubicaciones.push(new ubicacion(item.D, item.E, item.M, item.A, item.T, false));
      });

      //this._ubicaciones = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 409:
            break;
        }

      });
  }

  public onKeyUp(event: KeyboardEvent) {
    let cambio = false;
    let indice = -1;
    debugger;
    switch (event.key) {
      case "ArrowUp":
        console.log('ArrowUp');
        event.stopPropagation();
        this._ubicaciones.reverse().forEach( (item, index) => {
          console.log('item',item);
          if ((item.Seleccionado === false) && (cambio === false)) {
            item.Seleccionado = true;
            cambio = true;
            indice = index;
          }
         });
         this._ubicaciones.reverse().forEach( (item, index) => {
          if (indice != index) {
            item.Seleccionado = false;
          }
         });
        break;

      case "Enter":
        console.log('Enter');
        this.buscarPropiedades();
        event.stopPropagation();
        // (index === 0
        //    ? this.menuItemsRef.last 
        //    : this.menuItemsRef.get(index - 1)
        // ).nativeElement.focus();
        break;
    
      case "ArrowDown":
        event.stopPropagation();
        console.log('ArrowDown');

        this._ubicaciones.forEach( (item, index) => {
          console.log('item',item);
          if ((item.Seleccionado === false) && (cambio === false)) {
            item.Seleccionado = true;
            cambio = true;
            indice = index;
          }
         });
         this._ubicaciones.forEach( (item, index) => {
          if (indice != index) {
            item.Seleccionado = false;
          }
         });

        break;
        
        default:
        console.log('default');
        event.stopPropagation();
        this.obtenerUbicaciones();
        //
        break;
    }
  }

  buscarPropiedades(){
    Swal.fire({
      icon: 'success',
      title: 'Buscando....',
      text: 'Espere un momento por favor',
      showDenyButton:false,
      showCancelButton:true,
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
