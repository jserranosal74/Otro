export class publicacionDetalle {
    constructor(
      public Id_PublicacionDetalle : number,
      public Id_PublicacionPadre   : number,
      public Id_ClientePadre       : number,
      public Id_PublicacionHija    : number,
      public Id_ClienteHija        : number,
      public Id_Estatus            : number
    ) {
    }
  }

  export class publicacionDetalleVista {
    constructor(
      public Id_Publicacion           : number,
      public Id_Cliente               : number,
      public Id_TipoOperacion         : number,
      public Id_TipoPropiedad         : number,
      public Id_Moneda                : number,
      public DescripcionTP            : string | null,
      public DescripcionTO            : string | null,
      public TituloPublicacion        : string | null,
      public PrecioDesde              : number | null,
      public PrecioNegociable         : number | null,
      public RecamarasDesde           : number | null,
      public BaniosCompDesde          : number | null,
      public MedioBanioDesde          : number | null,
      public EstacionamientosDesde    : number | null,
      public SuperficieConstruidaDesde: number | null,
      public SuperficieTerreno        : number | null,
      public UnidadesDisponibles      : number | null,
      public UrlFotoPredeterminada    : string | null
    ) {
    }
  }