import { publicacionMultimedia } from "./publicacion.model";

export class favoritoCliente {
    constructor(
      public Id_Publicacion         : number,
      public Id_Cliente             : number,
      public Id_Moneda              : number,
      public UID_Cliente            : string | null,
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
      public PrecioDescuento        : number | null,
      public PrecioNegociable       : number | null,
      public RecamarasDesde         : number | null,
      public RecamarasHasta         : number | null,
      public BaniosCompDesde        : number | null,
      public BaniosCompHasta        : number | null,
      public SuperficieConstruidaDesde : number | null,
      public SuperficieTerreno      : number | null,
      public ClaveMoneda            : string | null,
      public UnidadesDisponibles    : number | null,
      public Vistas                 : number | null,
      public Url                    : string | null,
      public NombreCliente          : string | null,
      public ApellidosCliente       : string | null,
      public UrlFotoPerfil          : string | null,
      public FechaInicioPublicacion : Date   | null,
      public FechaFinPublicacion    : Date   | null,
      public FechaAlta              : Date,
      public FechaModificacion      : Date,
      public Estatus                : string,
      public EsFavorito             : number,
      public PerteneceADesarrollo   : number,
      public lstMultimedia          : publicacionMultimedia[] | null
    ) {}
  }

  export class favoritoClienteParams {
    constructor(
        public Id_Cliente_FavoritoCliente : string | null,
        public Id_Cliente                 : number | null,
        public Id_Publicacion             : number | null,
    ) {}
  }