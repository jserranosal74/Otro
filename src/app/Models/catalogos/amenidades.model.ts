export class amenidad {
    constructor(
      public Id_Amenidad: number,
      public Descripcion: string,
      public Orden: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
