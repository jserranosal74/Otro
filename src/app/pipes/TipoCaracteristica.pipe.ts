import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'DescripcionTC'})
export class TipoCaracteristicaPipe implements PipeTransform {
  constructor() {}

  transform(Id_TipoCaracteristica: number) {
    switch (Id_TipoCaracteristica) {
        case 1:
            return 'Caracteristicas generales';
        case 2:
            return 'Servicio';
        case 3:
            return 'Exteriores';
        case 5:
            return 'Ambientes';
        default:
            return 'N/A';
    }

  }
}