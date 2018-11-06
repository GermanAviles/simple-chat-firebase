import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Firechat';
 /**
  * Ejemplo con la documentación oficial de angularfire2
  */
  //chats: Observable<any[]>; database: AngularFirestore
  constructor(private _chatServies: ChatService) {
    //this.chats = database.collection('chats').valueChanges();
  }


  cerrarSesion(){
    this._chatServies.logout();
  }
}
