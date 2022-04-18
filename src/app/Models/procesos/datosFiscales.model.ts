export class datoFiscal {
    constructor(
      public Id_DatosFiscales: number,
      public Id_Cliente: number,
      public Id_TipoPersona: number,
      public NombreRazonSocial: string,
      public RFC: string,
      public DomicilioFiscal: string,
      public Email: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
