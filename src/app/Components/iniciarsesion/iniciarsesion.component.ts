import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { cliente } from 'src/app/Models/catalogos/cliente.model';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';

const fbLoginOptions = {
  // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  scope: 'email'
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

// const googleLoginOptions = {
//   scope: 'profile email'
// }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css'],
})

export class IniciarsesionComponent implements OnInit {
  user     : SocialUser = new SocialUser();
  loggedIn : boolean = false;
  _tipoAutenticacion : number = 0;
  _modoObscuro = ( localStorage.getItem('mo') === "true" ? true : false );

  obtenerTipo = 'password';
  formIniciarsesion = this.fb.group({
    correo: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
    password1: ['', Validators.required]
  });

  constructor( private fb : FormBuilder, 
               private _loginService : LoginService,
               private authService : SocialAuthService,
               private _clienteService : ClientesService,
               private _router : Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log('desde iniciarsesion ngOnInit:',this.user);
    });
  }

  crearFormulario() {
    this.formIniciarsesion = this.fb.group({
      correo: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      password1: ['', Validators.required]
    });
  }

  iniciarSesion() {
    //console.log(this.formIniciarsesion);

    let _login = new login(
      this.formIniciarsesion.get('correo')?.value,
      this.formIniciarsesion.get('password1')?.value
    );

    if (this.formIniciarsesion.invalid) {
      return Object.values(this.formIniciarsesion.controls).forEach(
        (control) => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach((control) =>
              control.markAsTouched()
            );
          } else {
            control.markAsTouched();
          }
        }
      );
    } else {
      //Envio de la informacion al servidor
      this._loginService.iniciarSesion(_login).subscribe(
        (data) => {
          //debugger;
          //console.log('datos: ', data);

          localStorage.setItem('usuario', JSON.stringify(data));
          
          // console.log(localStorage.getItem('usuario'));
          // console.log(JSON.parse(localStorage.getItem('usuario')!));
          //JSON.parse(localStorage.getItem('usuario'))['Token']

          //this._router.navigateByUrl('/inicio');

          window.location.href = '/inicio';

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          console.log('Error del servicio: ', error);

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

          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error al intentar autenticar el usuario',
            text: 'Correo y/o contraseña incorrectos.',
            showCancelButton: false,
            showDenyButton: false,
          });

          //throw error;   //You can also throw the error to a global error handler
        }
      );
    }
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formIniciarsesion.reset({
      correo    : '',
      password1 : ''
    });
  }

  get correoNoValido() {
    return ( this.formIniciarsesion.get('correo')?.invalid && this.formIniciarsesion.get('correo')?.touched );
  }

  get password1NoValido() {
    return ( this.formIniciarsesion.get('password1')?.invalid && this.formIniciarsesion.get('password1')?.touched );
  }
  
  cambiarTipo(){
    if (this.obtenerTipo === 'password'){
      this.obtenerTipo = 'text';
    }
    else{
      this.obtenerTipo = 'password';
    }
  }

  // iniciarSesionGoogle(){
  //   //debugger;
  //   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions).then( datosUsuario => { 
  //   //   this._tipoAutenticacion = 2; // Google
  //   //   this.AgregarUsuario(datosUsuario);
  //   // });;
  // }

  iniciarSesionFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then( datosUsuario => { 
      this._tipoAutenticacion = 3; // Facebook
      this.AgregarUsuario(datosUsuario);
    });
  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  signOut(): void {
    //this.authService.signOut();
  }

  AgregarUsuario(datosUsuario : SocialUser) {
  
    let _cliente = new cliente(0,1,2,null,this._tipoAutenticacion,datosUsuario.email,'',datosUsuario.firstName,datosUsuario.lastName,'',[],datosUsuario.photoUrl,0,0,0,'','',new Date(),new Date(),1,1,'');

    //debugger;

    this._clienteService.postCliente(_cliente).subscribe(
      (data) => {
        //Next callback
        console.log('Id_cliente',data);
        
        this._loginService.iniciarSesion(new login(_cliente.Email, _cliente.Password)).subscribe(
          (data) => {
            //debugger;
            //console.log('datos: ', data);
  
            localStorage.setItem('usuario', JSON.stringify(data));
            
            window.location.href = '/inicio';
  
            //this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error);
  
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
  
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Ocurrio un error al intentar autenticar el usuario',
            //   text: 'Correo y/o contraseña incorrectos.',
            //   showCancelButton: false,
            //   showDenyButton: false,
            // });
  
            //throw error;   //You can also throw the error to a global error handler
          }
        );

        this.iniciarSesion();

        this.limpiarFormulario();

        this._router.navigateByUrl('/iniciarsesion');

      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error,
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
