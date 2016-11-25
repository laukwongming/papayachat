class ChatUsersContainer {

    static getInstance() {
        if (!ChatUsersContainer._instance) {
            ChatUsersContainer._instance = new ChatUsersContainer();
        }
        return ChatUsersContainer._instance;
    }


    constructor(){
        this.clients = [];
    }

    addClient(c){
        this.clients.push(c);
    }

    findByAid(aid){
        let reuslt = this.clients.find(x=>x.aid === aid);
        if(reuslt !== undefined)
            return reuslt;

        return false;
    }

    removeClient(c){
        let index = this.clients.indexOf(c);

        if (index !== -1) {
            this.clients.splice(index,1);
        }
    }
}

module.exports = ChatUsersContainer;
