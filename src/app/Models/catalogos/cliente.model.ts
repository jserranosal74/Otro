export class cliente {
    constructor(
      public Id_Cliente                 : number,
      public UID_Cliente                : string | null,
      public Id_TipoCliente             : number | null, // 1 = InmueblesMeza, 2 = Externo
      public Id_TipoPersona             : number | null, // 1 = Moral, 2 = Fisica, null no definido
      public Id_Rol                     : number | null,         // Rol
      public Id_Empresa                 : number | null,
      public TipoAutenticacion          : number | null,
      public Email                      : string,
      public Password                   : string,
      public Nombre                     : string,
      public Apellidos                  : string,
      public RFC                        : string,
      public ClienteMedioContacto       : clienteMedioContacto[],
      public UrlFotoPerfil              : string,
      public RecibirOfertas             : number,
      public RecibirInformacion         : number,
      public AceptarTerminosCondiciones : number,
      public CodigoActivacion           : string,
      public CodigoRecuperacion         : string,
      public FechaUltimoAcceso          : Date,
      public FechaAlta                  : Date,
      public FechaModificacion          : Date,
      public Id_Usuario                 : number,
      public Estatus                    : string,
      public Id_Estatus                 : number,
      public NombreEmpresa              : string
    ) {}
  }

  export class clienteVista {
    constructor(
      public Id_Cliente     : number,
      public Nombre         : string,
      public Apellidos      : string,
      public Email          : string,
      public UrlFotoPerfil  : string,
      public ClienteMedioContacto : clienteMedioContacto[],
    ) {}
  }

  export class clienteMedioContacto {
    constructor(
        public Id_MedioContacto : number,
        public UID_Cliente      : string | null,
        public Descripcion      : string
    ) {}
  }