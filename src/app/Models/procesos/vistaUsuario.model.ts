export class vistaUsuario {
    constructor(
      public Id_Publicacion       : number,
      public Id_Cliente           : number,
      public Id_ClienteRegistrado : number | null,
      public TipoVista            : string,
      public PantallaHTML         : string,
      public FechaVista           : Date,
    ) {}
  }
