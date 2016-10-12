import {User} from "./User";

export class Event {
        private eventId: number;
        private eventName: string;
        private date: Date;
        private location: string;
        private address: string;
        private description: string;
        private eventHost: Array<User>;
        private participants: number;

    SearchEvents(){

    }

    CreateEvent(){

    }

    JoinEvent(eventId: number){

    }

    DeleteEvent(eventId: number){

    }

    LeaveEvent(eventId: number){

    }
}