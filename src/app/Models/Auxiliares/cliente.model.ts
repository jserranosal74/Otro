export class usuario {
    constructor(
      public Id_Cliente: number,
      public Id_Empresa: number | null,
      public Id_EmpresaCliente: number | null,
      public NombreUsuario: string,
      public Rol: string,
      public Token: string,
    ) {}
  }
