export class tipoFoto {
    constructor(
      public Id_TipoFoto: number,
      public Descripcion: string,
      public Order: number,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
