export class indicador {
    constructor(
      public Id_Indicador         : number,
      public Clave                : string,
      public DescripcionCorta     : string,
      public DescripcionLarga     : string,
      public VisibleCliente       : number,
      public EnviarCorreoACliente : number,
      public EnviarCorreoAUsuario : number,
      public FechaAlta            : Date,
      public FechaModificacion    : Date,
      public Id_Usuario           : number,
      public Id_Estatus           : number,
      public Mostrar              : boolean
    ) {}
  }
