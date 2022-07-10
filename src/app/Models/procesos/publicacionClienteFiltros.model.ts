export class publicacionClienteFiltros {
    constructor(
      public lstEstatus        : Estatus[],
      public lstTiposOperacion : TipoOperacion[],
      public lstTiposPropiedad : TipoPropiedad[],
      public lstTiposPlanes    : TipoPlan[],
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
      public Cantidad    : number
    ) {
    }
  }
  
  export class TipoOperacion {
    constructor(
      public Id_TipoOperacion : number,
      public Descripcion      : string,
      public Cantidad         : number
    ) {
    }
  }

  export class TipoPropiedad {
    constructor(
      public Id_TipoPropiedad : number,
      public Descripcion      : string,
      public Cantidad         : number
    ) {
    }
  }

  export class TipoPlan {
    constructor(
      public Id_Plan      : number | null,
      public Descripcion  : string,
      public Cantidad     : number
    ) {
    }
  }

  export class Asentamiento {
    constructor(
      public Id_Asentamiento : number,
      public Asentamiento    : string,
      public Cantidad        : number
    ) {
    }
  }

  export class Municipio {
    constructor(
      public Id_Municipio : number,
      public Municipio    : string,
      public Cantidad     : number
    ) {
    }
  }

  export class Estado {
    constructor(
      public Id_Estado : number,
      public Nombre    : string,
      public Cantidad  : number
    ) {
    }
  }

  export class verFiltros {
    constructor(
      public Estatus       : boolean,
      public TipoOperacion : boolean,
      public TipoPropiedad : boolean,
      public TipoPlan      : boolean,
      public Estado        : boolean,
      public Municipio     : boolean,
      public Asentamiento  : boolean,
    ) {
    }
  }