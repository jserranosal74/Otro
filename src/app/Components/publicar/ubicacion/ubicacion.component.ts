import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstadosService } from '../../../Services/estados.service';
import { AsentamientosService } from '../../../Services/asentamientos.service';
import { MunicipiosService } from '../../../Services/municipios.service';

import { estado } from '../../../Models/estado.model';
import { municipio } from '../../../Models/municipio.model';
import { asentamiento } from '../../../Models/asentamiento.model';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  _Estados: estado[] = [];
  _Municipios : municipio[] = [];
  _Asentamientos : asentamiento[] = [];
  _estadoSeleccionado : number = 0;
  _municipioSeleccionado : number = 0;
  _asentamientoSeleccionado : number = 0;

  loading : boolean = false;

  formaUbicacion = this.fb.group({
    direccion: this.fb.group({
      estado : ['', Validators.required ],
      municipio : ['', Validators.required ],
      asentamiento : ['', Validators.required ],
      calleynumero : ['', Validators.required ]
    })
  });

  constructor(private _estadoService: EstadosService,
              private _municipioService: MunicipiosService,
              private _asentamientoService: AsentamientosService,
              private fb: FormBuilder) {
    this.crearFormulario();
    this.obtenerEstados();
    this._estadoSeleccionado = 0;
    this._municipioSeleccionado = 0;
    this._asentamientoSeleccionado = 0;
   }

  ngOnInit(): void {
  }

  obtenerEstados(){
    console.log('obtenerEstados' + this.loading);
    this._estadoService.getEstados(1).subscribe((data) => {
      this._Estados = data;
      //this._Estados.unshift(new estado(0,0,'','Selecccione el Estado',new Date(),new Date(),1,1));
      this.loading = true;
      this._Municipios = [];
      return 0;
    });
    
  }
  
  obtenerMunicipios(Id_Estado : number){
    console.log('cargando municipios: ' + Id_Estado);
    this._municipioService.getMunicipios(Id_Estado).subscribe((data) => {
      this._Municipios = data;
      //this._Municipios.unshift(new municipio(0,0,'','Selecccione el Municipio',new Date(),new Date(),1,1));
      //this.loading = true;
      this._Asentamientos = [];
      //return 0;
    });
    
  }

  obtenerAsentamientos(Id_Estado : number, Id_Municipio : number){
    console.log(this.loading);
    this._asentamientoService.getAsentamientos(Id_Estado, Id_Municipio).subscribe((data) => {
      this._Asentamientos = data;
      //this._Asentamientos.unshift(new asentamiento(0,0,0,0,'Selecccione el Asentamiento','',0,0,new Date(),new Date(),1,1));
      this.loading = true;
        return 0;
      });

  }

  get estadoNoValido() {
    return this.formaUbicacion.get('estado')?.invalid && this.formaUbicacion.get('estado')?.touched
  }

  get municipioNoValido() {
    return this.formaUbicacion.get('municipio')?.invalid && this.formaUbicacion.get('municipio')?.touched
  }

  get asentamientoNoValido() {
    return this.formaUbicacion.get('asentamiento')?.invalid && this.formaUbicacion.get('asentamiento')?.touched
  }

  get calleynumeroNoValido() {
    return this.formaUbicacion.get('calleynumero')?.invalid && this.formaUbicacion.get('calleynumero')?.touched
  }

    crearFormulario() {

    this.formaUbicacion = this.fb.group({
      direccion: this.fb.group({
        estado : ['', Validators.required ],
        municipio : ['', Validators.required ],
        asentamiento : ['', Validators.required ],
        calleynumero : ['', Validators.required ]
      })
    });

  }

  guardarUbicacion() {
    console.log( this.formaUbicacion );

    if ( this.formaUbicacion.invalid ) {

      return Object.values( this.formaUbicacion.controls ).forEach( control => {
        
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
    this.formaUbicacion.reset({
      direccion: this.fb.group({
        estado : ['', Validators.required ],
        municipio : ['', Validators.required ],
        asentamiento : ['', Validators.required ],
        calleynumero : ['', Validators.required ]
      })
    });
    }
  }

  estadoSeleccionado(sel:number){
    //debugger;
    console.log('sel:' + sel + ',' + this.formaUbicacion.controls['direccion'].value.estado);
    //console.log(sel);
    this.obtenerMunicipios(this.formaUbicacion.controls['direccion'].value.estado);
  }

  municipioSeleccionado(sel:number){
    //debugger;
    console.log('sel:' + sel + ',' + this.formaUbicacion.controls['direccion'].value.municipio);
    //console.log(sel);
    this.obtenerAsentamientos(this.formaUbicacion.controls['direccion'].value.estado, this.formaUbicacion.controls['direccion'].value.municipio);
  }

  asentamientoSeleccionado(){
    //debugger;
    console.log('asentamientoSeleccionado: ' + this.formaUbicacion.controls['direccion'].value.asentamiento);
    //console.log(sel);
  }

}
