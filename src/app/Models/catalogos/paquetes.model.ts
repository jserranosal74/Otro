export class paquete {
    constructor(
      public Id_Paquete        : number,
      public Descripcion       : string,
      public Precio            : number,
      public Clave             : string,
      public ClaveProdServ     : string,
      public Id_Moneda         : number | null,
      public Id_Impuesto       : number | null,
      public Detalle           : paqueteDetalle[],
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
      public Seleccionado      : number
    ) {}
  }

  export class paqueteDetalle {
    constructor(
      public Id_PaqueteDetalle : number,
      public Id_Paquete        : number,
      public Id_Plan           : number,
      public Descripcion       : string,
      public Cantidad          : number,
      public VigenciaXUnidad   : number,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
      public Seleccionado      : number
    ) {}
  }
