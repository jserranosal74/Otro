export class publicacionVistaBloquear {
    constructor(
      public Id_Publicacion	        : number | null,
      public Id_Cliente	            : number | null,
      public Email                  : string | null,
      public Id_PlanCliente         : number | null,
      public Id_PaqueteCliente      : number | null,
      public Id_PaqueteDetalle      : number | null,
      public Id_TipoOperacion       : number | null,
      public DescripcionOperacion   : string | null,
      public Id_TipoPropiedad       : number | null,
      public DescripcionPropiedad   : string | null,
      public TituloPublicacion      : string | null,
      public FechaInicioPublicacion : Date   | null,
      public FechaFinPublicacion    : Date   | null,
      public FechaAlta              : Date   | null,
      public FechaModificacion      : Date   | null,
      public Id_Usuario             : number | null,
      public Id_Estatus             : number | null,
      public DescripcionEstatus     : string | null,
      public ReportesFraude         : number
    ) {
    }
  }