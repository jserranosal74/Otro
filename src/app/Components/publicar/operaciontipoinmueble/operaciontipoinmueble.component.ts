import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tipoPropiedad } from 'src/app/Models/tipoPropiedad.model';
import { PropiedadesService } from '../../../Services/propiedades.service';


@Component({
  selector: 'app-operaciontipoinmueble',
  templateUrl: './operaciontipoinmueble.component.html',
  styleUrls: ['./operaciontipoinmueble.component.css']
})
export class OperaciontipoinmuebleComponent implements OnInit {

  _tiposPropiedad: tipoPropiedad[] = [];
  tipoPropiedadSeleccionada : string = '';
  valorDefault:boolean=true;
  

  formaOTI = this.fb.group({
    tipoOperacion : [''],
    tipoPropiedad : ['']
  });

  constructor(private _tipoPropiedadService: PropiedadesService,
              private fb: FormBuilder) {
    this.crearFormulario();
    this.obtenerTiposPropiedad();
    this.valorDefault = true;
   }

  ngOnInit(): void {
  }

  obtenerTiposPropiedad(){
    this._tipoPropiedadService.getTiposPropiedad().subscribe((data) => {
      this._tiposPropiedad = data;
      this._tiposPropiedad.push(new tipoPropiedad(0,'','Selecccione el tipo de propiedad',new Date(),new Date(),1,1));
      console.log(data);
      // this.loading = false;
      // // Se ordena la informacion por el COL_KEYCOL
      // this._Colores.sort(function (a, b) {
      //   if (a.COL_KEYCOL > b.COL_KEYCOL) {
      //     return 1;
      //   }
      //   if (a.COL_KEYCOL < b.COL_KEYCOL) {
      //     return -1;
      //   }
      //   // a must be equal to b
        return 0;
      });

  }

  get tipoOperacionNoValido() {
    return this.formaOTI.get('tipoOperacion')?.invalid && this.formaOTI.get('tipoOperacion')?.touched
  }

  get tipoPropiedadValido() {
    return this.formaOTI.get('tipoPropiedad')?.invalid && this.formaOTI.get('tipoPropiedad')?.touched
  }

    crearFormulario() {

    this.formaOTI = this.fb.group({
      tipoOperacion : [''],
      tipoPropiedad : ['']
    });

  }

  guardarOTI() {
    console.log( this.formaOTI );

    if ( this.formaOTI.invalid ) {

      return Object.values( this.formaOTI.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }
    else{
      //Envio de la informacion al servidor

      // Reseteo de la información
    this.formaOTI.reset({
      tipoOperacion : '',
      tipoPropiedad : ''
    });
    }
  }

}
