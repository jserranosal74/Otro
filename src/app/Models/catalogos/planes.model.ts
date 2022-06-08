export class plan {
    constructor(
      public Id_Plan           : number,
      public Descripcion       : string,
      public Precio            : number,
      public Cantidad          : number,
      public VigenciaXUnidad   : number,
      public Clave             : string,
      public ClaveProdServ     : string,
      public Id_Moneda         : number | null,
      public Id_Impuesto       : number | null,
      public UrlImagen         : string,
      public Visible           : number,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
      public Seleccionado      : number
    ) {}
  }
