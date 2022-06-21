export class publicacionMensajesFiltros {
    constructor(
      public lstEstatus       : Estatus[],
      public lstAcciones      : Accion[],
      public lstPublicaciones : Publicacion[],
      public lstEmails        : Email[]
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
  
  export class Accion {
    constructor(
      public Id_Accion   : number,
      public Descripcion : string,
      public Cantidad    : number
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

  export class verFiltros {
    constructor(
      public Estatus     : boolean,
      public Accion      : boolean,
      public Publicacion : boolean,
      public Email       : boolean
    ) {
    }
  }