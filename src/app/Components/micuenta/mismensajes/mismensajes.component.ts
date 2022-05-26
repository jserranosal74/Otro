import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PublicacionMensajesService } from '../../../Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from '../../../Models/procesos/publicacionMensaje.model';

@Component({
  selector: 'app-mismensajes',
  templateUrl: './mismensajes.component.html',
  styleUrls: ['./mismensajes.component.css']
})
export class MismensajesComponent implements OnInit {
  _mensajesUsuarios : publicacionMensaje[] = [];

  constructor( private fb: FormBuilder,
               private _loginService : LoginService,
               private _publicacionMensajesService: PublicacionMensajesService
  ) {
    this.CargarMensajesUsuarios();
  }

  ngOnInit(): void {
  }

  CargarMensajesUsuarios(){
    this._publicacionMensajesService.getPublicacionesMensajes(this._loginService.obtenerIdCliente()).subscribe(
      (data) => {
        //Next callback

        this._mensajesUsuarios = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            // this._favoritosCliente = [];
            // this._paginadoDetalle = new paginadoDetalle(0,0);
            // this._seRealizaBusqueda = false;
            this._mensajesUsuarios = [];
            break;
          case 409:
            break;
        }
      }
    );
  }

  responderMensaje(){
    
  }

  responderWhatsApp(objMensaje : publicacionMensaje){
    window.open('https://api.whatsapp.com/send/?phone=52' + objMensaje.Telefono + '&text=Hola vi que estas interesado en esta propiedad: ' + objMensaje.TituloPublicacion + '. ¿Te puedo ayudar en algo?');
  }

  eliminarMensaje(objMensaje : publicacionMensaje){



    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el mensaje # "' + objMensaje.Id_PublicacionMensaje + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._publicacionMensajesService.deletePublicacionMensaje(objMensaje.Id_PublicacionMensaje, objMensaje.Id_Publicacion, objMensaje.Id_Cliente).subscribe(
          (data) => {
            //Next callback
    
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'El mensaje se eliminó de manera satisfactoria'
            });
    
            this.CargarMensajesUsuarios();
    
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
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })



  }

}
