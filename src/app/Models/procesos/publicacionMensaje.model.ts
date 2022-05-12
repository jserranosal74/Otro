export class publicacionMensaje {
    constructor(
      public Id_PublicacionMensaje : number,
      public Id_Publicacion        : number,
      public Id_Cliente            : number,
      public Id_ClienteMensaje     : number,
      public Nombre                : string,
      public Email                 : string,
      public Telefono              : string,
      public Mensaje               : string,
      public FechaAlta             : Date,
      public FechaModificacion     : Date,
      public Id_Usuario            : number,
      public Id_Estatus            : number
    ) {
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  