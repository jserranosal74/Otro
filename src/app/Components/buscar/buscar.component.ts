import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';
import Swal from 'sweetalert2';
import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  formaBuscar = this.fb.group({});
  _tiposPropiedad : tipoPropiedad[] = [];
  _rentaVentaDesarrolloRemate : number | null = 0;

  constructor( private fb: FormBuilder,
               private _activatedRoute: ActivatedRoute,
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
      asentamiento  : [''],
    });
  }

  limpiarFormulario(){
    this.formaBuscar.reset({
      tipoOperacion : '',
      tipoPropiedad : '',
      asentamiento  : ''
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

      });
  }

  seleccionarOperacion(){
    debugger;
    this._rentaVentaDesarrolloRemate = this.formaBuscar.controls['tipoOperacion'].value;

    // this.formaBuscar.patchValue({
    //   tipoPropiedad : '1'
    // });

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
