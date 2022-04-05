export class plancliente {
    constructor(
      public Id_PlanCliente: number,
      public Id_Plan: number,
      public Id_Cliente: number,
      public Descripcion: string,
      public Pagados: number,
      public Utilizados: number,
      public Restantes: number,
      public FechaDePago: Date,
    ) {}
  }
