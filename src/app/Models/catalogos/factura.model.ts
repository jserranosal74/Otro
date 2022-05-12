export class factura {
    constructor(
        public Id_PlanCliente	 : number | null,
        public Id_Plan	         : number | null,
        public Id_Cliente	     : number | null,
        public Id_DatosFiscales	 : number | null,
        public Disponibles	     : number | null,
        public Descripcion	     : string | null,
        public MontoFacturado	 : number | null,
        public FechaDePago	     : Date   | null,
        public FechaFacturacion	 : Date   | null,
        public NumFactura	     : string | null,
        public NombreRazonSocial : string | null,
        public RFC               : string | null,
    ) {}
  }