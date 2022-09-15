export class usoCFDI {
    constructor(
      public Id_UsoCFDI          : number | null,
      public ClaveUsoCFDI        : string | null,
      public Descripcion         : string | null,
      public AplicaPersonaFisica : number | null,
      public AplicaPersonaMoral  : number | null,
    ) {}
  }

export class formaPago {
    constructor(
      public Id_FormaPago   : number | null,
      public ClaveFormaPago : string | null,
      public Descripcion    : string | null
    ) {}
  }
