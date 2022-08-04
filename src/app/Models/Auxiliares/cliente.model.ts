export class usuario {
    constructor(
      public UID_Cliente   : string | null,
      public Id_Empresa    : number | null,
      public NombreUsuario : string,
      public UrlFotoPerfil : string,
      public Rol           : string,
      public Token         : string,
    ) {}
  }
