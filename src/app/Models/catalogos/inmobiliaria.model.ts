export class inmobiliaria {
    constructor(
      public Id_Inmobiliaria: number,
      public Id_Cliente: number,
      public Nombre: string,
      public DomicilioFiscal: string,
      public RFC: string,
      public Email: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
