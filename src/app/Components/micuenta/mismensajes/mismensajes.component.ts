import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PublicacionMensajesService } from '../../../Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from '../../../Models/procesos/publicacionMensaje.model';
import { Accion, Email, Estatus, Publicacion, publicacionMensajesFiltros, verFiltros } from 'src/app/Models/procesos/publicacionMensajesFiltros.model';
import { PublicacionMensajesFiltrosService } from 'src/app/Services/Procesos/publicacionMensajesFiltros.service';

@Component({
  selector: 'app-mismensajes',
  templateUrl: './mismensajes.component.html',
  styleUrls: ['./mismensajes.component.css']
})
export class MismensajesComponent implements OnInit {
  _mensajesUsuarios : publicacionMensaje[] = [];
  _mostrarFiltros : boolean = sessionStorage.getItem('mf') === '1'? true : false;
  _collapseFiltros = false;

  _publicacionMensajesFiltros : publicacionMensajesFiltros = new publicacionMensajesFiltros([],[],[],[]);
  _verFiltros : verFiltros = new verFiltros(true,true,true,true);
  _filtrosSeleccionados : publicacionMensajesFiltros = new publicacionMensajesFiltros([],[],[],[]);

  _colapseEstatus = false;
  _colapseAccion = false;
  _colapsePublicacion = false;
  _colapseEmail = false;

  @ViewChild('myColapseFiltro1') colapseFiltro1 : any;
  @ViewChild('myColapseFiltro2') colapseFiltro2 : any;
  @ViewChild('myColapseFiltro3') colapseFiltro3 : any;
  @ViewChild('myColapseFiltro4') colapseFiltro4 : any;

  constructor( private fb: FormBuilder,
               private _loginService : LoginService,
               private _publicacionMensajesService: PublicacionMensajesService,
               private _publicacionMensajesFiltrosService : PublicacionMensajesFiltrosService
  ) {
    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes(null,null);
    this._mostrarFiltros = sessionStorage.getItem('mf') === '1'? true : false;
  }

  ngOnInit(): void {
  }

  verMensaje(){
    
  }

  responderWhatsApp(objMensaje : publicacionMensaje){
    window.open('https://api.whatsapp.com/send/?phone=52' + objMensaje.Telefono + '&text=Hola vi que estas interesado en esta propiedad: ' + objMensaje.TituloPublicacion + '. ¿Te puedo ayudar en algo?');
  }

  responderEmail(objMensaje : publicacionMensaje){
    //window.open('https://api.whatsapp.com/send/?phone=52' + objMensaje.Telefono + '&text=Hola vi que estas interesado en esta propiedad: ' + objMensaje.TituloPublicacion + '. ¿Te puedo ayudar en algo?');
  }

  verPublicacionCliente(objMensaje : publicacionMensaje){
    window.open('anuncio/vista/' + (objMensaje.TituloPublicacion)?.replaceAll(' ','-') + '-' + objMensaje.Id_Publicacion);
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
    
            this.ejecutarConsulta();
            this.obtenerFiltrosMensajes(null,null);
    
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

  mostrarFiltros(){
    this._mostrarFiltros = !this._mostrarFiltros;
    sessionStorage.setItem('mf', this._mostrarFiltros ? '1' : '0');
  }

  seleccionarFiltroEstatus(objEstatus : Estatus){

    this._filtrosSeleccionados.lstEstatus.push(objEstatus);

    this._publicacionMensajesFiltros.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._publicacionMensajesFiltros.lstEstatus.splice(index,1); 
      }
    });
    
    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Estatus','Agregar');
  }

  seleccionarFiltroAccion(objAccion : Accion){

    this._filtrosSeleccionados.lstAcciones.push(objAccion);

    this._publicacionMensajesFiltros.lstAcciones.forEach((item,index) => {
      if (item.Id_Accion === objAccion.Id_Accion){
        this._publicacionMensajesFiltros.lstAcciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Accion','Agregar');
  }

  seleccionarFiltroPublicacion(objPublicacion : Publicacion){
    this._filtrosSeleccionados.lstPublicaciones.push(objPublicacion);

    this._publicacionMensajesFiltros.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._publicacionMensajesFiltros.lstPublicaciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Publicacion','Agregar');
  }

  seleccionarFiltroEmail(objEmail : Email){
    this._filtrosSeleccionados.lstEmails.push(objEmail);

    this._publicacionMensajesFiltros.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._publicacionMensajesFiltros.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Email','Agregar');
  }

  ejecutarConsulta(){
    this._publicacionMensajesService.getPublicacionesMensajes(this._loginService.obtenerIdCliente(), this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                     this._filtrosSeleccionados.lstAcciones[0] === undefined ? null : this._filtrosSeleccionados.lstAcciones[0].Id_Accion,
                                                                                                     this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                     this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email).subscribe(
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
            this._mensajesUsuarios = [];
            break;
          case 409:
            break;
        }
      }
    );
  }

  removerFiltroEstatus(objEstatus : Estatus){
    // this._planesPaquetesFiltros.lstEstatus.push(objEstatus);

    this._filtrosSeleccionados.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._filtrosSeleccionados.lstEstatus.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Estatus','Quitar');

  }

  removerFiltroAccion(objAccion : Accion){
    this._publicacionMensajesFiltros.lstAcciones.push(objAccion);

    this._filtrosSeleccionados.lstAcciones.forEach((item,index) => {
      if (item.Id_Accion === objAccion.Id_Accion){
        this._filtrosSeleccionados.lstAcciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Accion','Quitar');

  }

  removerFiltroPublicacion(objPublicacion : Publicacion){
    this._publicacionMensajesFiltros.lstPublicaciones.push(objPublicacion);

    this._filtrosSeleccionados.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._filtrosSeleccionados.lstPublicaciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Publicacion','Quitar');
  }

  removerFiltroEmail(objEmail : Email){
    this._publicacionMensajesFiltros.lstEmails.push(objEmail);

    this._filtrosSeleccionados.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._filtrosSeleccionados.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes('Email','Quitar');
  }

  colapseEstatus(){
    this._colapseEstatus = !this._colapseEstatus;
  }

  colapseAccion(){
    this._colapseAccion = !this._colapseAccion;
  }

  colapsePublicacion(){
    this._colapsePublicacion = !this._colapsePublicacion;
  }

  colapseEmail(){
    this._colapseEmail = !this._colapseEmail;
  }

  colapsarFiltros(){
    debugger;
    this._collapseFiltros = !this._collapseFiltros;

    if (this._collapseFiltros){
      if (!this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (!this._colapseAccion)
        this.colapseFiltro2.nativeElement.click();
      if (!this._colapsePublicacion)
        this.colapseFiltro3.nativeElement.click();
      if (!this._colapseEmail)
        this.colapseFiltro4.nativeElement.click();
    }
    else{
      if (this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (this._colapseAccion)
        this.colapseFiltro2.nativeElement.click();
      if (this._colapsePublicacion)
        this.colapseFiltro3.nativeElement.click();
      if (this._colapseEmail)
        this.colapseFiltro4.nativeElement.click();
    }
  }

  eliminarFiltros(){

    this._filtrosSeleccionados = new publicacionMensajesFiltros([],[],[],[]);

    this.ejecutarConsulta();
    this.obtenerFiltrosMensajes(null,null);

  }

  obtenerFiltrosMensajes(filtroSeleccionado : string | null, strAgregarQuitar : string | null){
    debugger;

    if (strAgregarQuitar === 'Agregar'){
      switch (filtroSeleccionado) {
        case 'Estatus':
            this._verFiltros.Estatus = false;
          break;
        case 'Accion':
            this._verFiltros.Accion = false;
          break;
        case 'Publicacion':
            this._verFiltros.Publicacion = false;
          break;
        case 'Email':
            this._verFiltros.Email = false;
          break;
        default:
          break;
      }
    }
    else {
      switch (filtroSeleccionado) {
        case null:
            this._verFiltros = new verFiltros(true,true,true,true);
          break;
        case 'Estatus':
            this._verFiltros.Estatus = true;
          break;
        case 'Accion':
            this._verFiltros.Accion = true;
          break;
        case 'Publicacion':
            this._verFiltros.Publicacion = true;
          break;
        case 'Email':
            this._verFiltros.Email = true;
          break;
        default:
          break;
      }
    }
debugger;
    this._publicacionMensajesFiltrosService.getPublicacionMensajesFiltros(this._loginService.obtenerIdCliente(), this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                                 this._filtrosSeleccionados.lstAcciones[0] === undefined ? null : this._filtrosSeleccionados.lstAcciones[0].Id_Accion,
                                                                                                                 this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                                 this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email).subscribe(
      (data) => {
        //Next callback
        //console.log('data',data);
        this._publicacionMensajesFiltros = data;
        //console.log('_publicacionMensajesFiltros',this._publicacionMensajesFiltros);
        
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

}
