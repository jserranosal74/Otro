export class cliente {
    constructor(
      public Id_Cliente: number,
      public Id_TipoPersona: number,
      public Email: string,
      public Password: string,
      public Nombre: string,
      public Apellidos: string,
      public RFC: string,
      public UrlFotoPerfil: string,
      public RecibirOfertas: string,
      public RecibirInformacion: string,
      public AceptarTerminosCondiciones: string,
      public CodigoVerificacion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
