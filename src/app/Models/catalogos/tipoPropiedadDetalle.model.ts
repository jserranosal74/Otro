export class subtipoPropiedad {
    constructor(
      public Id_SubtipoPropiedad: number, // cambio remote
      public Id_TipoPropiedad: number, // cambio remote
      public Clave: string,
      public Descripcion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
