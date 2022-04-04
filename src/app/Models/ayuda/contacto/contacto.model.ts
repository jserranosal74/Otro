export class contacto {
    constructor(
      public Id_Contacto: number,
      public nombre: string,
      public email: string,
      public telefono: string,
      public asunto: string,
      public mensaje: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
