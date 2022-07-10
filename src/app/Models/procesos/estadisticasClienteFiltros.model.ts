export class estadisticasClienteFiltros {
    constructor(
      public lstEstatus                 : Estatus[],
      public lstPublicaciones           : Publicacion[],
      public lstEmails                  : Email[],
      public lstFechasInicioPublicacion : FechaInicioPublicacion[],
    ) {
    }
  }

  export class indicadoresColumnas {
    constructor(
      public lstIndicadores             : Indicador[]
    ) {
    }
  }

  export class Indicador {
    constructor(
      public Id_Indicador     : number,
      public Clave            : string,
      public DescripcionCorta : string,
      public Mostrar          : boolean | null
    ) {
    }
  }

  export class Publicacion {
    constructor(
      public Id_Publicacion    : number,
      public TituloPublicacion : string,
      public Cantidad          : number
    ) {
    }
  }
  
  export class Email {
    constructor(
      public Id_ClienteMensaje : number | null,
      public Email      : string,
      public Cantidad   : number
    ) {
    }
  }

  export class Estatus {
    constructor(
      public Id_Estatus  : number,
      public Descripcion : string,
      public Cantidad    : number
    ) {
    }
  }

  export class FechaInicioPublicacion {
    constructor(
      public FechaInicioPublicacion : Date,
      public Cantidad               : number
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Publicacion            : boolean,
      public Email                  : boolean,
      public Estatus                : boolean,
      public FechaInicioPublicacion : boolean
    ) {
    }
  }