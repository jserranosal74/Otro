export class facturaExterna {
    constructor(
        public Id_Factura       : number | null,
        public Id_Cliente	      : number | null,
        public UID_Cliente	    : string | null,
        public Email	          : string | null,
        public Status	          : string | null,
        public Total	          : string | null,
        public Id_UsoCFDI	      : number | null,
        public ClaveUsoCFDI	    : string | null,
        public Id_FormaPago	    : number | null,
        public ClaveFormaPago	  : string | null,
        public Message	        : string | null,
        public MessageDetail	  : string | null,
        public CFDI	            : string | null,
        public UUID	            : string | null,
        public FechaAltaFactura : Date | null,
        public Enviando         : boolean
    ) {}
  }

  export class facturaExternaDetalle {
    constructor(
        public Id_Factura           : number | null,
        public Id_Producto	        : number | null,
        public Clave	            : string | null,
        public ClaveProdServ	    : string | null,
        public DescripcionProducto  : string | null,
        public Precio	            : number | null,
        public Cantidad 	        : number | null
    ) {}
  }