/**
 * Created by kwongminglau on 29/11/2016.
 */
const EventEmitter = require("events").EventEmitter;


class ChatPRC extends EventEmitter {


    static KEY_RosterOnLine = 'ChatPRC_rosterOnLine';
    static KEY_RosterOffLine = 'ChatPRC_rosterOffline';

    constructor(){
        super();

    }

    destroy(){

    }


}
