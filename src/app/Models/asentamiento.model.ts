export class asentamiento {
    constructor(
      public Id_Asentamiento: number,
      public Id_Estado: number,
      public Id_Municipio: number,
      public Id_TipoAsentamiento: number,
      public Asentamiento: string,
      public CodigoPostal: string,
      public Latitud: number,
      public Longitud: number,
      public Fecha_Alta: Date,
      public Fecha_Modificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
