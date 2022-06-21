export class publicacionClienteFiltros {
    constructor(
      public lstEstatus        : Estatus[],
      public lstTiposOperacion : TipoOperacion[],
      public lstTiposPropiedad : TipoPropiedad[],
      public lstAsentamientos  : Asentamiento[],
      public lstMunicipios     : Municipio[],
      public lstEstados        : Estado[]
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
  
  export class TipoOperacion {
    constructor(
      public Id_TipoOperacion : number,
      public Descripcion      : string,
      public Cantidad         : string
    ) {
    }
  }

  export class TipoPropiedad {
    constructor(
      public Id_TipoPropiedad : number,
      public Descripcion      : string,
      public Cantidad         : string
    ) {
    }
  }

  export class Asentamiento {
    constructor(
      public Id_Asentamiento : number,
      public Asentamiento    : string,
      public Cantidad        : string
    ) {
    }
  }

  export class Municipio {
    constructor(
      public Id_Municipio : number,
      public Municipio    : string,
      public Cantidad     : string
    ) {
    }
  }

  export class Estado {
    constructor(
      public Id_Estado : number,
      public Nombre    : string,
      public Cantidad  : string
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Estatus       : boolean,
      public TipoOperacion : boolean,
      public TipoPropiedad : boolean,
      public Estado        : boolean,
      public Municipio     : boolean,
      public Asentamiento  : boolean,
    ) {
    }
  }