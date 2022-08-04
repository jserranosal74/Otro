export class configuracion {
    constructor(
      public Id_Configuracion  : number,
      public Configuracion     : string,
      public Valor             : number,
      public Descripcion       : string,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
    ) {}
  }
