export class favoritoCliente {
    constructor(
      public Id_Publicacion         : number,
      public Id_Cliente             : number,
      public PlanCliente            : string | null,    // Gratis, simple, destacado, superdestacado, etc...
      public TipoOperacion          : string | null,
      public TipoPropiedad          : string | null,
      public SubtipoPropiedad       : string | null,
      public Estado                 : string | null,
      public Municipio              : string | null,
      public Asentamiento           : string | null,
      public TituloPublicacion      : string | null,
      public Descripcion            : string | null,
      public Direccion              : string | null,
      public PrecioDesde            : number | null,
      public PrecioHasta            : number | null,
      public ClaveMoneda            : string | null,
      public UnidadesDisponibles    : number | null,
      public Vistas                 : number | null,
      public Url                    : string | null,
      public FechaInicioPublicacion : Date   | null,
      public FechaFinPublicacion    : Date   | null,
      public FechaAlta              : Date,
      public FechaModificacion      : Date,
      public Estatus                : string,
      public EsFavorito             : number
    ) {}
  }

  export class favoritoClienteParams {
    constructor(
        public Id_Cliente_FavoritoCliente: number | null,
        public Id_Cliente: number | null,
        public Id_Publicacion: number | null,
    ) {}
  }