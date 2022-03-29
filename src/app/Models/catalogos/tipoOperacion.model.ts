export class tipoOperacion {
    constructor(
      public Id_TipoOperacion: number,
      public Descripcion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
