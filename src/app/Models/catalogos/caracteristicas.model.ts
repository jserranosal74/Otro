export class caracteristica {
    constructor(
        public Id_Caracteristica : number,
        public Id_TipoCaracteristica : number,
        public Descripcion : string | null,
        public FechaAlta : Date,
        public FechaModificacion : Date,
        public Id_Usuario : number | null,
        public Id_Estatus : number | null,
    ) {}
  }

  export class tipoCaracteristica {
    constructor(
        public Id_TipoCaracteristica : number,
        public Descripcion : string | null,
        public FechaAlta : Date,
        public FechaModificacion : Date,
        public Id_Usuario : number | null,
        public Id_Estatus : number | null,
    ) {}
  }