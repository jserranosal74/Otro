export class amenidad {
    constructor(
      public Id_Amenidad       : number,
      public Descripcion       : string,
      public Orden             : number,
      public FechaAlta         : Date | null,
      public FechaModificacion : Date | null,
      public Id_Usuario        : number,
      public Id_Estatus        : number 
    ) {}
  }
