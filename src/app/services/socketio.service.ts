import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;

  constructor(private userService:UserService) { }

  setupSocketConnection(conv:String[]){
    this.socket = io(environment.BASE_URL,{
      query:{conversations:JSON.stringify(conv)}
    });
    console.log(this.socket);
  }  

  sendMessage(form){
    form.author = this.userService.copyUserInfo()._id;
    let interaction = {
        room:form.conversation,
        message:form
    };

    this.socket.emit('message',JSON.stringify(interaction))
    console.log('message sent: ',interaction)
  }

  returnConversations(){
    return this.userService.copyUserInfo().conversations;
  }

  returnAuthorID(){
    return this.userService.copyUserInfo()._id;
  }
}
