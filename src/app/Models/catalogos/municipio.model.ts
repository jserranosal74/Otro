export class municipio {
    constructor(
      public Id_Municipio: number,
      public Id_Estado: number,
      public ClaveMunicipio: string,
      public Municipio: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
