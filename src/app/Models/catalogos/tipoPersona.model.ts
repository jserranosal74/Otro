export class tipoPersona {
    constructor(
      public Id_TipoPersona: number,
      public Descripcion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
