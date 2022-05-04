export class publicacion {
    constructor(
      public Id_Publicacion: number,
      public Id_Cliente: number,
      public Id_PlanCliente: number | null,
      public Id_TipoOperacion: number | null,
      public Id_TipoPropiedad: number | null,
      public Id_Moneda: number,
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
      public MedioBanioDesde: number | null,
      public MedioBanioHasta: number | null,
      public EstacionamientosDesde: number | null,
      public EstacionamientosHasta: number | null,
      public SuperficieConstruidaDesde: number | null,
      public SuperficieConstruidaHasta: number | null,
      public SuperficieTerreno: number | null,
      public Latitud: number | null,
      public Longitud: number | null,
      public UnidadesDisponibles: number | null,
      public PosibleEstafa: number | null,
      public Vistas: number | null,
      public VideoUrl: string | null,
      public MostrarDireccionExacta: number | null,
      public Antiguedad: number | null,
      public CuotaMantenimiento: number | null,
      public EstadoConservacion: number | null,
      public NivelesConstruidos: number | null,
      public NivelPropiedad: number | null,
      public Closets: number | null,
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
      public ClaveMoneda: string | null,
      public UnidadesDisponibles: number | null,
      public Vistas: number | null,
      public Url: string | null,
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
      public ClaveMoneda: string | null,
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

  export class publicacionCaracteristica {
    constructor(
      public Id_Publicacion : number | null,
      public Id_Cliente : number | null,
      public Id_Caracteristica : number | null,
      public Id_TipoCaracteristica : number | null,
      public Descripcion: string | null,
      public Valor : number | null,
      public FechaAlta : Date | null,
      public FechaModificacion : Date | null,
      public Id_Estatus : number | null,
      public Id_Usuario : number | null,
    ) {
    }
  }

  export class publicacionCaracteristicaLigth {
    constructor(
      public Id_Caracteristica : number,
      public Id_TipoCaracteristica : number,
      public Valor : number,
    ) {
    }
  }

  export class publicacionMultimedia {
    constructor(
      public Id_Multimedia : number,
      public Id_Publicacion : number,
      public Id_Cliente : number,
      public Id_TipoMultimedia : number,
      public Descripcion : number | null,
      public Url: string | null,
      public Predeterminada : boolean,
      public FechaAlta : Date | null,
      public FechaModificacion : Date | null,
      public Id_Estatus : number | null,
      public Id_Usuario : number | null,
    ) {
    }
  }

  export class imagenModel {
    constructor(
      public Id_Multimedia : number,
      public Id_TipoMultimedia : number,
      public Url : string,
      public ImagenBase64 : string,
      public Descripcion : string,
      public Predeterminada : number,
    ) {
    }
  }