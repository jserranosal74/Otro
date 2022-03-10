export class TipoPropiedad {
    constructor(
      public Id_TipoPropiedad: number, // cambio remote
      public Clave: string,
      public Descripcion: string,
      public Fecha_Alta: Date,
      public Fecha_Modificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
