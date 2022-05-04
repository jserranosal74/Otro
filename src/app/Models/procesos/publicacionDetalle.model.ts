export class publicacionDetalle {
    constructor(
      public Id_PublicacionDetalle : number,
      public Id_PublicacionPadre   : number,
      public Id_ClientePadre       : number,
      public Id_PublicacionHija    : number,
      public Id_ClienteHija        : number,
      public Id_Estatus            : number
    ) {
    }
  }