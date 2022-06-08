export class empresa {
    constructor(
        public Id_Empresa        : number,
        public Id_Estado         : number,
        public Id_Municipio      : number,
        public Nombre            : number,
        public Descripcion       : string,
        public TipoEmpresa       : string,
        public MediosContacto    : empresaMedioContacto[] | null,
        public FechaAlta         : Date,
        public FechaModificacion : Date,
        public Id_Usuario        : number,
        public Id_Estatus        : number,
    ) {}
  }

  export class empresaMedioContacto {
    constructor(
        public Id_EmpresaMedioContacto : number | null,
        public Id_Empresa              : number,
        public Id_MedioContacto        : number,
        public Descripcion             : string,
        public FechaAlta               : Date,
        public FechaModificacion       : Date,
        public Id_Usuario              : number,
        public Id_Estatus              : number,
    ) {}
  }

  export class emcform {
    constructor(
        public Id_MedioContacto : number,
        public Descripcion      : string,
    ) {}
  }

  export class empresaCliente {
    constructor(
        public Id_Cliente        : number,
        public Id_Empresa        : number,
        public Email             : string,
        public Nombre            : string,
        public Apellidos         : string,
        public Descripcion       : string,
        public TipoEmpresa       : string,
        public FechaAlta         : Date,
        public FechaModificacion : Date,
        public Id_Usuario        : number,
        public Id_Estatus        : number,
    ) {}
  }