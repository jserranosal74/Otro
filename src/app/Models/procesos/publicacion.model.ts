export class publicacion {
    constructor(
      public Id_Publicacion: number,
      public Id_Cliente: number,
      public Id_PlanCliente: number | null,
      public Id_TipoOperacion: number | null,
      public Id_TipoPropiedad: number | null,
      public Id_SubtipoPropiedad: number | null,
      public Id_Asentamiento: number | null,
      public TituloPublicacion: string | null,
      public Descripcion: string | null,
      public Direccion: string | null,
      public PrecioDesde: number | null,
      public PrecioHasta: number | null,
      public PrecioNegociable: number | null,
      public RecamarasDesde: number | null,
      public RecamarasHasta: number | null,
      public BaniosCompDesde: number | null,
      public BaniosCompHasta: number | null,
      public EstacionamientosDesde: number | null,
      public EstacionamientosHasta: number | null,
      public MedioBanio: number | null,
      public Jardin: number | null,
      public Garage: number | null,
      public Sotano: number | null,
      public SuperficieConstruidaDesde: number | null,
      public SuperficieConstruidaHasta: number | null,
      public SuperficieTerreno: number | null,
      public Latitud: number | null,
      public Longitud: number | null,
      public UnidadesDisponibles: number | null,
      public NumeroPisos: number | null,
      public PosibleEstafa: number | null,
      public Vistas: number | null,
      public VideoUrl: string | null,
      public MostrarDireccionExacta: number | null,
      public Antiguedad: number | null,
      public CuotaMantenimiento: number | null,
      public AireAcondicionado: number | null,
      public Calefaccion: number | null,
      public Amueblado: number | null,
      public CocinaIntegral: number | null,
      public PermiteMascotas: number | null,
      public Chimenea: number | null,
      public EscuelasCercanas: number | null,
      public CuartoServicio: number | null,
      public FrenteAParque: number | null,
      public FrenteAlMar: number | null,
      public Closets: number | null,
      public EstadoConservacion: number | null,
      public FechaInicioPublicacion: Date | null,
      public FechaFinPublicacion: Date | null,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Id_Usuario: number,
      public Id_Estatus: number
    ) {
    }
  }

  // Usada para la vista en miniatura de 'Mis mensajes'
  export class publicacionInfoMini {
    constructor(
      public Id_Publicacion: number,
      public Id_Cliente: number,
      public PlanCliente: string | null,    // Gratis, simple, destacado, superdestacado, etc...
      public TipoOperacion: string | null,
      public TipoPropiedad: string | null,
      public SubtipoPropiedad: string | null,
      public Estado: string | null,
      public Municipio: string | null,
      public Asentamiento: string | null,
      public TituloPublicacion: string | null,
      public Descripcion: string | null,
      public Direccion: string | null,
      public PrecioDesde: number | null,
      public PrecioHasta: number | null,
      public UnidadesDisponibles: number | null,
      public Vistas: number | null,
      public FechaInicioPublicacion: Date | null,
      public FechaFinPublicacion: Date | null,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Estatus: string
    ) {
    }
  }

  // Usada para las vistas en el resultado de busquedas del usuario final
  export class publicacionInfoNormal {
    constructor(
      public Id_Publicacion: number,
      public Id_Cliente: number,
      public PlanCliente: string | null,
      public TipoOperacion: string | null,
      public TipoPropiedad: string | null,
      public SubtipoPropiedad: string | null,
      public Estado: string | null,
      public Municipio: string | null,
      public Asentamiento: string | null,
      public TituloPublicacion: string | null,
      public Descripcion: string | null,
      public Direccion: string | null,
      public PrecioDesde: number | null,
      public PrecioHasta: number | null,
      public UnidadesDisponibles: number | null,
      public Vistas: number | null,
      public FechaInicioPublicacion: Date | null,
      public FechaFinPublicacion: Date | null,
      public FechaAlta: Date,
      public FechaModificacion: Date,
      public Estatus: string
    ) {
    }
  }
