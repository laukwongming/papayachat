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

    findById(c){
        let index = this.clients.indexOf(c);
    }

    removeClient(c){
        let index = this.clients.indexOf(c);

        if (index !== -1) {
            this.clients.splice(index,1);
        }
    }
}