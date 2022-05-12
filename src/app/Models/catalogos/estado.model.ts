export class estado {
    constructor(
      public Id_Estado         : number,
      public Id_Pais           : number,
      public Clave             : string,
      public Nombre            : string,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number 
    ) {}
  }
