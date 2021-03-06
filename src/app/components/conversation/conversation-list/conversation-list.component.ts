import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../../services/socketio.service';
import { UserService } from '../../../services/user.service';
import { Conversation } from '../../../models/conversation';
import { Message } from '../../../models/message';
import { fade } from '../../../animation';

@Component({
    selector:'app-conversation-list',
    templateUrl:'./conversation-list.component.html',
    styleUrls:['./conversation-list.component.css'],
    animations:[fade]
})

export class ConversationListComponent implements OnInit{
    public messages:Message[]=[];
    public conversation:Conversation;
    
    public conversations:Conversation[];

    public conversationObject:any = {};

    constructor(private socketService:SocketioService,
                private userService:UserService){

    }

    ngOnInit(){
        
        let userId = this.socketService.returnAuthorID();
        this.socketService.setupSocketConnection(userId);

        this.socketService.socket.on('onInit',(conversations:Conversation[])=>{
            this.conversations = conversations;
            
            if(conversations.length){
                
                this.objectifyConv();
                this.displayConversation(conversations[0]._id);                
            }      
            
        });
        
        this.socketService.socket.on('message',(conv:Conversation)=>{
            
            if(!this.conversationObject.hasOwnProperty(conv._id)){
                this.conversations.push(conv);
            }
            
            this.conversationObject[conv._id] = conv;
            this.displayConversation(conv._id);
        });
        
        this.socketService.socket.on('message:new',id=>{            
            this.socketService.socket.emit('conv:get',id);
        })

        this.socketService.socket.on('conv:receive',conv=>{
            this.messages.push(conv);
            alert("Someone just send a new message!!");            
        })
    }    
    
    onSubmit(form){
        this.socketService.sendMessage(form);
    }

    objectifyConv(){
        this.conversations.forEach((conv:Conversation)=>{
            this.conversationObject[conv._id] = conv;
        })
    }

    displayConversation(id:string){        
        this.messages = this.conversationObject[id].messages;
        this.conversation = this.conversationObject[id];
    }    
    
}