import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Pet } from '../../../models/pet';
import { Message } from '../../../models/message';
import { SocketioService } from '../../../services/socketio.service';

 
@Component({
    selector:'app-message-post',
    templateUrl:'./message-post.component.html',
    styleUrls:['./message-post.component.css']
})

export class MessagePostComponent implements OnInit, OnDestroy{
    @Input() pet:Pet;
    public conversations:String[];
    private authorID:String;

    constructor(private socketService:SocketioService){

    }

    ngOnInit(){
        console.log('on init message post')
        console.log(this.pet);
        this.conversations = this.socketService.returnConversations();
        this.socketService.setupSocketConnection(this.conversations);
        this.authorID = this.socketService.returnAuthorID();  
                   
    }

    ngOnDestroy(){
        console.log('Start of onDestroy - message post');
        this.socketService.socket.disconnect();
             
    }

    onSubmit(form){
        let message = new Message();
        message.recepient = !form.value.recepient?this.pet.owner:form.value.recepient;
        message.content = form.value.content;
        message.timestamp = new Date();
        message.conversation = !form.value.conversation?"":form.value.conversation;

        this.socketService.sendMessage(message);
    }    
}