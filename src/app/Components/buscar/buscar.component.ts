import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  @Input() TipoPropiedad = '';

  constructor(private _activatedRoute: ActivatedRoute) {

    this._activatedRoute.params.subscribe((routeParams) => {
      //console.log('entro a constructor: '+this._activatedRoute.snapshot.params['tipo']);

      // Swal.fire({
      //   title: '¿Desea guardar los cambios?' + this._activatedRoute.snapshot.params['tipo'],
      //   showDenyButton: true,
      //   showCloseButton: true,
      //   showCancelButton: false,
      //   confirmButtonText: 'Si',
      //   denyButtonText: `No`,
      //   footer: '<a href="">¿Por que estas viendo esta falla?</a>'
      // }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     Swal.fire('Los cambios se guardaron de manera correcta', '', 'success')
      //   } else if (result.isDenied) {
      //     Swal.fire('La información no ha sido guardada', '', 'info')
      //   }
      // })
    });

  }

  ngOnInit(): void {
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
