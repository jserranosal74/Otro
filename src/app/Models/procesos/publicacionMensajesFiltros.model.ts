export class publicacionMensajesFiltros {
    constructor(
      public lstEstatus       : Estatus[],
      public lstIndicadores   : Indicador[],
      public lstPublicaciones : Publicacion[],
      public lstEmails        : Email[],
      public lstFechas        : Fecha[]
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
  
  export class Indicador {
    constructor(
      public Id_Indicador : number,
      public Descripcion  : string,
      public Cantidad     : number
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
      public Email    : string,
      public Cantidad : number
    ) {
    }
  }

  export class Fecha {
    constructor(
      public FechaAlta : Date,
      public Cantidad  : number
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Estatus     : boolean,
      public Indicador   : boolean,
      public Publicacion : boolean,
      public Email       : boolean,
      public Fecha       : boolean
    ) {
    }
  }