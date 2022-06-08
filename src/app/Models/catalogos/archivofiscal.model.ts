export class archivoFiscal {
    constructor(
        public Id_ArchivoFiscal  : number | null,
        public ArchivoCer        : string,
        public ArchivoKey        : string,
        public NombreArchivoCer  : string,
        public NombreArchivoKey  : string,
        public Password          : string,
        public FechaAlta         : Date   | null,
        public FechaModificacion : Date   | null,
        public Id_Usuario        : number,
        public Id_Estatus        : number,
        public DescripcionEstatus        : string
    ) {}
  }

