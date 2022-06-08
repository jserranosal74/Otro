export class tipoAsentamiento {
    constructor(
      public Id_TipoAsentamiento : number,
      public Clave               : string,
      public Descripcion         : string,
      public FechaAlta           : Date,
      public FechaModificacion   : Date,
      public Id_Usuario          : number,
      public Id_Estatus          : number 
    ) {}
  }
