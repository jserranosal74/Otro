export class publicacionMensaje {
    constructor(
      public Id_PublicacionMensaje : number | null,
      public Id_Publicacion        : number,
      public Id_Cliente            : number,
      public UID_Cliente           : string,
      public UID_ClienteMensaje    : string | null,
      public Id_Indicador          : number,
      public Componente            : string,
      public TituloPublicacion     : string,
      public Nombre                : string,
      public Email                 : string,
      public Telefono              : string,
      public Mensaje               : string,
      public FechaAlta             : Date,
      public FechaModificacion     : Date,
      public Id_Usuario            : number,
      public Id_Estatus            : number,
      public EstatusPublicacion    : string
    ) {
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  