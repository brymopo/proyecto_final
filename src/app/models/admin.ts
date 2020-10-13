import { User } from './user';
import { Ad } from './ad';

export class Admin extends User{
    reportedAds: Ad[];
    admin:Ad[];
}