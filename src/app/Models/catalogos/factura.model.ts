export class factura {
    constructor(
        public Id_PlanCliente	 : number | null,
        public Id_PaqueteCliente : number | null,
        public Id_Plan	         : number | null,
        public Id_Paquete        : number | null,
        public Id_Cliente	     : number | null,
        public Id_DatosFiscales	 : number | null,
        public Descripcion	     : string | null,
        public MontoFacturado	 : number | null,
        public FechaDePago	     : Date   | null,
        public FechaFacturacion	 : Date   | null,
        public SerieFactura	     : string | null,
        public FolioFactura	     : number | null,
        public NombreRazonSocial : string | null,
        public RFC               : string | null,
        public Email             : string | null,
        public Enviando          : boolean
    ) {}
  }