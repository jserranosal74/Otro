export class medioContacto {
    constructor(
      public Id_MedioContacto: number,
      public Clave: string,
      public Descripcion: string,
      public Fecha_Alta: Date,
      public Fecha_Modificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
