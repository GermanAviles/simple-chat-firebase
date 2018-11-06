import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor( public _chatServices: ChatService) {

    this._chatServices.cargarMensajes().subscribe( () => {
      // ejecua esto 10ms
      setTimeout( () => {
        // scroll del contenedor siempre estará abajo (ultimo mensaje)
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 10);

    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    //console.log(this.mensaje);
    if( this.mensaje.length === 0 ){
      return;
    }else{
      this._chatServices.addMensaje( this.mensaje )
        .then( () => this.mensaje = "")
        .catch( (err) => console.error("Error al enviar mensaje: ", err) );
    }
  }



}
