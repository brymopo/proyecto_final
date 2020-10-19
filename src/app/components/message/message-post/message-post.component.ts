import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Pet } from '../../../models/pet';
import { Message } from '../../../models/message';
import { Conversation } from '../../../models/conversation';
import { SocketioService } from '../../../services/socketio.service';

 
@Component({
    selector:'app-message-post',
    templateUrl:'./message-post.component.html',
    styleUrls:['./message-post.component.css']
})

export class MessagePostComponent implements OnInit, OnDestroy{
    @Input() pet:Pet;
    @Input() conversation:Conversation;    
    private authorID:String;

    constructor(private socketService:SocketioService){

    }

    ngOnInit(){
        console.log('on init message post')
        console.log(this.pet);
        this.authorID = this.socketService.returnAuthorID(); 
        
        if(this.socketService.socket){
            console.log("There is already a socket connected!")
        }

        console.log('featured conv on init..',this.conversation)
                           
    }

    ngOnDestroy(){
        /* console.log('Start of onDestroy - message post');
        this.socketService.socket.disconnect(); */
             
    }

    onSubmit(form){
        let message = new Message();
        message.recepient = this.getRecepient() || this.pet.owner;
        message.content = form.value.content;
        message.timestamp = new Date();
        message.conversation = !this.conversation ? "" : this.conversation._id;

        this.socketService.sendMessage(message);        
    } 
    
    getRecepient(){
        if(!this.conversation){
            return null;
        }
        let result = this.conversation.participants.filter(id=> id !== this.authorID);
        return result[0];
    }
}