export class banco {
    constructor(
        public Id_Banco : number,
        public InstitucionBancaria : string,
        public Sucursal : string,
        public NumCuenta : string,
        public ClabeInterbancaria : string,
        public Orden : number,
        public FechaAlta : Date,
        public FechaModificacion : Date,
        public Id_Usuario : number,
        public Id_Estatus : number,
    ) {}
  }

