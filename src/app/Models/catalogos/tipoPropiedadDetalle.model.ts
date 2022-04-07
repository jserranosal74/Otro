export class tipoPropiedadDetalle {
    constructor(
      public Id_TipoPropiedadDetalle: number, // cambio remote
      public Id_TipoPropiedad: number, // cambio remote
      public Clave: string,
      public Descripcion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
