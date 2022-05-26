export class paquete {
    constructor(
      public Id_Paquete        : number,
      public Id_Empresa        : number,
      public Descripcion       : number,
      public Precio            : number,
      public Detalle           : paqueteDetalle[],
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
    ) {}
  }

  export class paqueteDetalle {
    constructor(
      public Id_PaqueteDetalle : number,
      public Id_Paquete        : number,
      public Id_Plan           : number,
      public Cantidad          : number,
      public VigenciaXUnidad   : number,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
    ) {}
  }
