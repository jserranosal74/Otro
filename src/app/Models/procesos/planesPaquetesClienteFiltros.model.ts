export class planesPaquetesClienteFiltros {
    constructor(
      public lstTiposAnuncios : TipoAnuncio[],
      public lstTiposPlanes   : TipoPlan[],
      public lstEstatus       : Estatus[]
    ) {
    }
  }

  export class TipoAnuncio {
    constructor(
      public Id_TipoAnuncio : number,
      public Descripcion    : string,
      public Cantidad       : string
    ) {
    }
  }
  
  export class TipoPlan {
    constructor(
      public Id_Plan : number,
      public Descripcion : string,
      public Cantidad    : string
    ) {
    }
  }

  export class Estatus {
    constructor(
      public Id_Estatus  : number,
      public Descripcion : string,
      public Cantidad    : string
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Estatus     : boolean,
      public TipoPlan    : boolean,
      public TipoAnuncio : boolean
    ) {
    }
  }