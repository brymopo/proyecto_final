import { Message } from './message';

export interface Conversation{
    participants:String[],
    messages:Message[],
}