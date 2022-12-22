import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs!: Subscription;

  ngOnInit() {
    this.ingresosSubs = this.store.select('ie').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string | undefined) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  }
}
