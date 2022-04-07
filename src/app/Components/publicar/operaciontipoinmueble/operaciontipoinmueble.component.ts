import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tipoPropiedad } from '../../../Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from '../../../Services/Catalogos/tiposPropiedades.service';

@Component({
  selector: 'app-operaciontipoinmueble',
  templateUrl: './operaciontipoinmueble.component.html',
  styleUrls: ['./operaciontipoinmueble.component.css']
})
export class OperaciontipoinmuebleComponent implements OnInit {

  _tiposPropiedad: tipoPropiedad[] = [];
  tipoPropiedadSeleccionada : number = 0;
  loading:boolean = false;
  // EsVenta=false;
  // EsRenta=false;
  VentaSeleccionada=false;
  RentaSeleccionada=false;

  formaOTI = this.fb.group({
    tipoOperacion : ['', [Validators.required] ],
    tipoPropiedad : ['', [Validators.required] ],
  });

  constructor(private _tipoPropiedadService: TiposPropiedadService,
              private fb: FormBuilder) {
    this.crearFormulario();
    this.obtenerTiposPropiedad();
    this.tipoPropiedadSeleccionada = 0;
   }

  ngOnInit(): void {
  }

  obtenerTiposPropiedad(){
    console.log(this.loading);
    this._tipoPropiedadService.getTiposPropiedades().subscribe((data) => {
      this._tiposPropiedad = data;
      this._tiposPropiedad.unshift(new tipoPropiedad(0,'','--Selecccione el tipo de inmueble--',new Date(),new Date(),1,1));
      //console.log(data);
      this.loading = true;
      //console.log(this.loading);
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
    tipoOperacion : ['', [Validators.required] ],
    tipoPropiedad : ['', [Validators.required] ],
    });

  }

  guardarOTI() {
    console.log(this.formaOTI.get('tipoOperacion')?.value);
    console.log(this.formaOTI.get('tipoPropiedad')?.value);

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
      //this.limpiarFormulario();
    
  }
}

limpiarFormulario(){
  this.formaOTI.reset({
    tipoOperacion : '',
    tipoPropiedad : ''
  });
  
}

  somethingChanged(sel:number){
    console.log('sel:' + sel + ',' + this.formaOTI.controls['tipoPropiedad'].value);
    //console.log(sel);
  }

}
