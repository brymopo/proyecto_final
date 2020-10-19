import { Message } from './message';
import { Pet } from './pet';

export interface Conversation{
    participants:String[],
    messages:Message[],
    _id:string,
    pet:Pet
}