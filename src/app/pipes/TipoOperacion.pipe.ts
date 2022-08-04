import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'DescripcionTO'})
export class TipoOperacionPipe implements PipeTransform {
  constructor() {}

  transform(Id_TipoOperacion : number | null) {
    switch (Id_TipoOperacion) {
        case 1:
            return 'Venta';
        case 2:
            return 'Renta';
        case 3:
            return 'Desarrollo';
        case 4:
            return 'Remate';
        case 5:
            return 'Renta eventual';
        default:
            return 'N/A';
    }

  }
}