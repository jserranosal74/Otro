export class estado {
    constructor(
      public Id_Estado: number,
      public Id_Pais: number,
      public Clave: string,
      public Nombre: string,
      public Fecha_Alta: Date,
      public Fecha_Modificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
