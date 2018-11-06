import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _chatServies: ChatService) { }

  ngOnInit() {
  }

  ingresar( tipoAuth:string ){ 
    this._chatServies.login( tipoAuth );
  }

}
