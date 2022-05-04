export class plan {
    constructor(
      public Id_Plan: number,
      public Descripcion: string,
      public Precio: number,
      public Cantidad: number,
      public VigenciaXUnidad : number,
      public UrlImagen : string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number,
      public Seleccionado : number
    ) {}
  }
