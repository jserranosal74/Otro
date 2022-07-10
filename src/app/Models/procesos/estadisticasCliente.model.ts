export class estadisticasCliente {
    constructor(
      public Id_Publicacion                                 : number,
      public TituloPublicacion                              : string,
      public VistaTelefono                                  : number,
      public EnvioMensaje                                   : number,
      public ContactoWhatssAppDesdePublicacion              : number,
      public VistaPublicacion                               : number,
      public VistaPublicacionEnListado                      : number,
      public VistaFotografias                               : number,
      public VistaVideos                                    : number,
      public CompartirLinkPublicacionDesdeListado           : number,
      public CompartirPublicacionFacebookDesdeListado       : number,
      public CompartirPublicacionWhatssAppDesdeListado      : number,
      public CompartirLinkPublicacionDesdePublicacion       : number,
      public CompartirPublicacionFacebookDesdePublicacion   : number,
      public CompartirPublicacionWhatssAppDesdePublicacion  : number,
      public FavoritoDurantePublicacion                     : number,
      public InmuebleRentadoOVendido                        : number,
      public CompartirPublicacionCorreoElectronicoDesdePublicacion : number,
      public VistaPlanosPublicacion                         : number,
      public FechaEnvio                                     : Date
    ) {}
  }