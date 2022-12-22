import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!: Subscription;
  private _user!: Usuario | null;

  get user() {
    return { ...this._user };
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    //nos avisa de cuándo un usuario inicia sesión o cierra sesión
    this.auth.authState.subscribe((fuser) => {
      //console.log(fuser);
      //console.log(fuser?.uid);
      //console.log(fuser?.displayName);
      if (fuser) {
        this.userSubscription = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            console.log(firestoreUser);
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user: user }));
          });
      } else {
        console.log('llamar unset del user');
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid, nombre, user?.email);
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser });
      });
  }

  loguearUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
