export class paqueteEmpresa {
    constructor(
      public Id_Paquete        : number,
      public ClavePaquete      : string,
      public Paquete           : string,
      public Precio            : number,
      public Id_Empresa        : number,
      public Empresa           : string,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
      public Seleccionado      : number
    ) {}
  }