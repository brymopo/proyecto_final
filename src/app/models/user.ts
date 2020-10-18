import { Pet } from './pet';
import { Ad } from './ad';
import { Survey } from './survey';
import { Conversation } from './conversation';

export class User{
    username:String;
    firstName:String;
    lastName:String;
    email:String;
    phone:Number;    
    ads:Ad[];
    pets:Pet[];    
    conversations:String[];    
    survey:Survey[];
    _id:String 
}
 