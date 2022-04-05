import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { PlanesclienteService } from '../../../Services/Procesos/planesCliente.service';
import { plancliente } from '../../../Models/procesos/plancliente.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';

@Component({
  selector: 'app-miplan',
  templateUrl: './miplan.component.html',
  styleUrls: ['./miplan.component.css'],
})
export class MisplanesComponent implements OnInit {
_planesCliente : plancliente[] = [];

  // formaPlanes = this.fb.group({
  //   nombre: ['', Validators.required],
  //   correo: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
  //     ],
  //   ],
  //   rfc: ['', Validators.required],
  //   telefono: ['', Validators.required],
  // });

  constructor(
    private fb: FormBuilder,
    private _planClienteervice: PlanesclienteService,
    private _loginService : LoginService
  ) {
    // this.crearFormulario();
    this.obtenerMisPlanes();
  }

  ngOnInit(): void {}

  // crearFormulario() {
  //   this.formaPlanes = this.fb.group({
  //     nombre: ['', Validators.required],
  //     correo: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
  //       ],
  //     ],
  //     rfc: ['', Validators.required],
  //     telefono: ['', Validators.required],
  //   });
  // }

  // limpiarFormulario(){
  //   // Reseteo de la información
  //   this.formaPlanes.reset({
  //     nombre: ['', Validators.required ],
  //     correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ], ],
  //     rfc: ['', Validators.required ],
  //     telefono: ['', Validators.required ]
  //   });
  // }

  obtenerDetallePlan(objPlanCliente: plancliente) {
    Swal.fire({
      icon: 'success',
      title: 'Aqui se mostrara el detalle del plan',
      text: 'Registro: ' + objPlanCliente.Descripcion + ' - ' + objPlanCliente.Id_PlanCliente,
      showCancelButton: false,
      showDenyButton: false,
    });
  }

  obtenerMisPlanes() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._planClienteervice.getPlanesCliente(Id_Usuario).subscribe(
      (data) => {
        console.log('datos: ', data);

        this._planesCliente = data;

        // Swal.fire({
        //   icon: 'success',
        //   title: 'Gracias por registrarse!!!!',
        //   text: 'Revise su correo por favor para activar su cuenta.',
        //   showCancelButton: false,
        //   showDenyButton: false,
        // });

        //this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        switch (error.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              text: 'debera autenticarse',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._loginService.cerarSesion();
            break;
          case 403:
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 403');
            break;
          case 404:
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 404');
            break;
          case 409:
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 409');
            break;
        }
      }
    );
  }

}
