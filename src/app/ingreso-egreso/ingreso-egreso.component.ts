import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  type: string = 'ingreso';
  loading: boolean = false;
  loadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.loading = isLoading));

    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    console.log(this.ingresoForm.value);

    const { description, amount } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(description, amount, this.type);

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        console.log(err);
      });
  }
}
