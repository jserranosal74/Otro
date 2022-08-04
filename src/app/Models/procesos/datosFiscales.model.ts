export class datoFiscal {
    constructor(
      public Id_DatosFiscales  : number,
      public Id_Cliente        : number,
      public UID_Cliente       : string | null,
      public Id_TipoPersona    : number,
      public NombreRazonSocial : string,
      public RFC               : string,
      public DomicilioFiscal   : string,
      public CodigoPostal      : string,
      public Email             : string,
      public Predeterminada    : number,
      public FechaAlta         : Date,
      public FechaModificacion : Date,
      public Id_Usuario        : number,
      public Id_Estatus        : number,
      public Seleccionado      : number
    ) {}
  }
