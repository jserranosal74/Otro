export class facturasClienteFiltros {
    constructor(
      public lstAnios : Anio[],
      public lstMeses : Mes[],
    ) {
    }
  }

  export class Anio {
    constructor(
      public Id_Anio  : number,
      public Cantidad : number
    ) {
    }
  }
  
  export class Mes {
    constructor(
      public Id_Mes      : number,
      public Descripcion : string,
      public Cantidad    : number
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Anio : boolean,
      public Mes  : boolean
    ) {
    }
  }