export class paqueteCliente {
    constructor(
      public Id_PaqueteCliente  : number | null,
      public Id_Paquete         : number | null,
      public Id_Cliente         : number,
      public UID_Cliente        : string | null,
      public Id_DatosFiscales   : number  | null,
      public Descripcion        : string  | null,
      public NumFactura         : string  | null,
      public FechaDePago        : Date    | null,
      public FechaFacturacion   : Date    | null,
      public NombreRazonSocial  : string  | null,
      public RFC                : string  | null,
      public Id_Estatus         : number,
      public DescripcionEstatus : string,
      public Detalle            : planClienteDetalle[] | null,
      public Seleccionado       : number,
      public Enviando           : boolean
    ) {
    }
  }

  export class planClienteDetalle {
    constructor(
      public Id_PaqueteCliente : number,
      public Id_PaqueteDetalle : number,
      public Descripcion       : string,
      public Disponibles       : number,
      public Utilizados        : number,
      public VigenciaXUnidad   : number,
      public Restantes         : number,
      public Id_Publicacion    : number,
      public TituloPublicacion : string,
      public Seleccionado      : boolean
    ) {
    }
  }