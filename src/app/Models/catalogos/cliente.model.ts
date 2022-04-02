export class cliente {
    constructor(
      public Id_Cliente: number,
      public Id_TipoPersona: number,
      public Id_Rol: number,
      public Email: string,
      public Password: string,
      public Nombre: string,
      public Apellidos: string,
      public RFC: string,
      public UrlFotoPerfil: string,
      public RecibirOfertas: number,
      public RecibirInformacion: number,
      public AceptarTerminosCondiciones: number,
      public CodigoActivacion: string,
      public CodigoRecuperacion: string,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number 
    ) {}
  }
