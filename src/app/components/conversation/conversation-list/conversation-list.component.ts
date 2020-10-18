import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from '../../../services/socketio.service';
import { Message } from '../../../models/message';

@Component({
    selector:'app-conversation-list',
    templateUrl:'./conversation-list.component.html',
    styleUrls:['./conversation-list.component.css']
})

export class ConversationListComponent implements OnInit, OnDestroy{
    public messages:String[]=[];
    
    public conversations:String[];

    constructor(private socketService:SocketioService){

    }

    ngOnInit(){
        
        this.conversations = this.socketService.returnConversations();
        this.socketService.setupSocketConnection(this.conversations);
        
        this.socketService.socket.on('message',data=>{
            this.messages.push(data);
            alert("I received a new message");
            console.log(data);
        })   
    }

    ngOnDestroy(){
        console.log('Start of onDestroy');
        this.socketService.socket.disconnect();
    }
    
    onSubmit(form){
        this.socketService.sendMessage(form);
    }
}