export class cliente {
    constructor(
      public Id_Cliente: number,
      public Id_TipoPersona: number,
      public Id_Rol: number,
      public Id_Empresa: number | null,
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
  export class clienteMedioContacto {
    constructor(
        public Id_Empresa : number,
        public Id_MedioContacto : number,
        public Descripcion : string,
        public FechaAlta : Date,
        public FechaModificacion : Date,
        public Id_Usuario : number,
        public Id_Estatus : number,
    ) {}
  }