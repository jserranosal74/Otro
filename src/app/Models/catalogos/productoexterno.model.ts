export class productoExterno {
    constructor(
      public Id_Producto       : number,
      public Clave             : string | null,
      public ClaveProdServ     : string | null,
      public Descripcion       : string | null,
      public Precio            : number | null,
      public Cantidad          : number | null,
      public Unidad            : string | null,
      public Id_Moneda         : number | null,
      public Id_Impuesto       : number | null,
      public FechaAlta         : Date   | null,
      public FechaModificacion : Date   | null,
      public Id_Usuario        : number | null,
      public Id_Estatus        : number | null,
      public Seleccionado      : number
    ) {}
  }

export class producto {
    constructor(
      public Id_Producto       : number,
      public Precio            : number | null,
      public Cantidad          : number | null
    ) {}
  }