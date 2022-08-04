export class tipoPropiedad {
    constructor(
      public Id_TipoPropiedad  : number, // cambio remote
      public Clave             : string,
      public Descripcion       : string,
      public Descripcion2      : string,
      public Orden             : number,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number 
    ) {}
  }
