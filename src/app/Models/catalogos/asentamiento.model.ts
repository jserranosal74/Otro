export class asentamiento {
    constructor(
      public Id_Asentamiento     : number,
      public Id_Estado           : number,
      public Id_Municipio        : number,
      public Id_TipoAsentamiento : number,
      public Asentamiento        : string,
      public CodigoPostal        : string,
      public Latitud             : number,
      public Longitud            : number,
      public FechaAlta           : Date,
      public FechaModificacion   : Date,
      public Id_Usuario          : number,
      public Id_Estatus          : number 
    ) {}
  }

  export class paginadoDetalle {
    constructor(
      public TotalPaginas   : number,
      public TotalRegistros : number
    ) {}
  }

  export class pagina {
    constructor(
      public Activa : boolean,
      public Pagina : number
    ) {}
  }

  export class asentamientoUbicacion {
    constructor(
      public Id_Asentamiento     : number,
      public Id_Estado           : number,
      public Id_Municipio        : number,
      public Id_TipoAsentamiento : number,
      public Asentamiento        : string,
      public Municipio           : string,
      public Estado              : string,
      public Pais                : string,
      public CodigoPostal        : string,
      public Latitud             : number,
      public Longitud            : number
    ) {}
  }