import { Component, Input, OnInit } from '@angular/core';
import { Pet } from '../../../models/pet';
import { Message } from '../../../models/message';
import { Conversation } from '../../../models/conversation';
import { SocketioService } from '../../../services/socketio.service';

 
@Component({
    selector:'app-message-post',
    templateUrl:'./message-post.component.html',
    styleUrls:['./message-post.component.css']
})

export class MessagePostComponent implements OnInit{
    @Input() pet:Pet;
    @Input() conversation:Conversation;
    @Input() isAdShow:boolean; 
    public  messageSent = false;
    public isLoading = false;
    private authorID:String;
    public msgContent:string;

    constructor(private socketService:SocketioService){

    }

    ngOnInit(){        
        this.authorID = this.socketService.returnAuthorID(); 
        
        if(!this.socketService.socket){
            this.socketService.setupSocketConnection(this.authorID);
        }

        this.socketService.socket.on('message', (conv:Conversation)=>{
            this.isLoading = false;
            this.msgContent = ""; 
            if(this.isAdShow){
                alert('Mensaje Enviado!')
            }           
        });
                                   
    }    

    onSubmit(form){
        let message = new Message();
        message.recepient = this.getRecepient() || this.pet.owner;
        message.content = form.value.content;
        message.timestamp = new Date();
        message.conversation = !this.conversation ? "" : this.conversation._id;
        this.isLoading = true;
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