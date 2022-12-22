import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'order',
})
export class OrderPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return (items = items.slice().sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    }));
  }
}
