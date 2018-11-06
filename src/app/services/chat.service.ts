import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Mensaje[] = [];

  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth) {

          this.afAuth.authState.subscribe( (user) => {
            console.log('Estado del usuario: ', user);

            if ( !user ) {
              return null;
            }

            this.usuario.nombre = user.displayName;
            this.usuario.uid = user.uid;
            this.usuario.correo = user.email;

            console.log(this.usuario);
          });
  }


  cargarMensajes() {
    /**
     * Creamos nuestra colección(nodo padre) sino existe para acceder a ella
     * y almacenarla todo lo que haya en la db en "itemsCollection"
     * mandamos un query a traves de la referencia "ref"
    */
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                           .limit(5));

    return this.itemsCollection.valueChanges()
          .pipe( map ( (mensajes: Mensaje[]) => {
                  console.log(mensajes);
                  // iniciamos el arreglo vacio
                  this.chats = [];
                  // recorremos cada uno de los elementos de nuestra data "mensajes" que es un arreglo
                  mensajes.forEach(mensaje => {
                    // inseramos en la primera posición del arreglo "chats" el "mensaje"
                    this.chats.unshift( mensaje );
                  });
                  // this.chats = mensajes;
                })
    );
  }

  addMensaje( texto: string ) {

    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );

  }

  login( tipoauth: string) {

    if ( tipoauth === 'google' ) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
    }

  }
  logout() {
    // eliminamos los datos que tengamos almacenados
    this.usuario = {};

    this.afAuth.auth.signOut();
  }
}
