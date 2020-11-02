import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { UserService } from '../../../services/user.service';
import { fade } from '../../../animation';
import * as moment from 'moment';

@Component({
    selector:'app-conversation-show',
    templateUrl:'./conversation-show.component.html',
    styleUrls:['./conversation-show.component.css'],
    animations:[fade]
})

export class ConversationShowComponent implements OnInit{
    @Input() messages:Message[];
    private userId:String;

    constructor(private userService:UserService){

    }

    ngOnInit(){
        this.userId = this.userService.copyUserInfo()._id;
    }

    isUser(id){
        return id == this.userId
    }

    formatDate(timestamp){
        return moment(timestamp).format('MM-DD-YYYY');
    }
}