const { Users } = require('./models/users.js')
const { Topics } = require('./models/topics.js')

// This class is for handle of alerts system
class AlertsSystem {
    #users
    #topics

    constructor(){
        this.#users = {}
        this.#topics = {}
    }

    // Methods Getters
    get getUsers(){
        return this.#users
    }

    get getTopics(){
        return this.#topics
    }

    // Use Case

    registerUser(name){
        if(!this.#users[name]){
            this.#users[name] = new Users(name)
        }
    }

    registerTopic(name){
        if(!this.#topics[name]){
            this.#topics[name] = new Topics(name)
        }
    }

    chooseTopics(username, topicName){
        const user = this.#users[username]
        const topic = this.#topics[topicName] 
        if(user && topic){
            user.addTopic(topicName)
        }
    }

    sendAlertToTopic(alert, topicName){
        const topic = this.#topics[topicName]
        if(topic){
            topic.addAlert(alert)
            const listUsers = Object.values(this.#users)
            listUsers.forEach(user => {
                if(user.hasTopic(topicName)){
                    user.receiveAlert(alert)
                }
            })
        }
    }

    sendAlertToUser(alert, username){
        const user = this.#users[username]
        if(user){
            user.receiveAlert(alert)
        }
    }

    listUnreadAlertToUser(username){
        const user = this.#users[username]
        if(user){
            return user.getUnreadAlerts()
        }
    }

    listAlertToTopic(topicName){
        const topic = this.#topics[topicName];
        if(topic){
            return topic.getAlertNotExpiration();
        }
    }

}

module.exports = { AlertsSystem }