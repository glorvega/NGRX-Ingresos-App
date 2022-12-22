import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;

    delete ingresoEgreso.uid;

    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
    /*       .then((ref) => console.log('exito', ref))
      .catch((err) => console.warn(err)); */
  }

  initIngresosEgresosListener(uid: string) {
    return (
      this.firestore
        .collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        //snapshot da información sobre los movimientos
        .pipe(
          map((snapshot) => {
            console.log(snapshot);

            return snapshot.map((doc) => ({
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            }));
          })
        )
    );
  }

  borrarIngresoEgreso(uidItem: string | undefined) {
    const uid = this.authService.user.uid;
    return this.firestore
      .doc(`${uid}/ingresos-egresos/items/${uidItem}`)
      .delete();
  }
}
