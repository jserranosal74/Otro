export class plancliente {
    constructor(
      public Id_PlanCliente: number,
      public Id_Plan: number,
      public Id_Cliente: number,
      public Descripcion: string,
      public Disponibles: number,
      public Utilizados: number,
      public Restantes: number,
      public FechaDePago: Date | null,
      public FechaAlta: Date | null,
      public FechaModificacion: Date | null,
      public Id_Usuario: number,
      public Id_Estatus: number,
    ) {}
  }
