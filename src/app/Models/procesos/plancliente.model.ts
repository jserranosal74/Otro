export class plancliente {
    constructor(
      public Id_PlanCliente: number,
      public Id_Plan: number,
      public Id_Cliente: number,
      public Id_DatosFiscales: number | null,
      public Descripcion: string,
      public Disponibles: number,
      public Utilizados: number,
      public Restantes: number,
      public Id_Publicacion: number,
      public TituloPublicacion: string,
      public FechaDePago: Date | null,
      public FechaFacturacion: Date | null,
      public NumFactura: string | null,
      public FechaAlta: Date | null,
      public FechaModificacion: Date | null,
      public Id_Estatus: number,
      public DescripcionEstatus: string,
      public Seleccionado: number,
    ) {
    }
  }

  export class planClientePagos {
    constructor(
      public Id_PlanCliente: number,
      public Id_Plan: number,
      public Id_Cliente: number,
      public Id_DatosFiscales: number | null,
      public Descripcion: string,
      public Disponibles: number,
      public Email: string,
      public Nombre: string,
      public Apellidos: string,
      public FechaDePago: Date | null,
      public FechaFacturacion: Date | null,
      public NumFactura: string | null,
      public Id_Estatus: number,
      public DescripcionEstatus: string,
    ) {
    }
  }