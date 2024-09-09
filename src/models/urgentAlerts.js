const { Alerts } = require('../abstract/alerts.js')

class UrgentAlerts extends Alerts {
    constructor(message, expirationDate, personalAlert = false){
        super(message, expirationDate, "Urgent", personalAlert)
    }
}

module.exports = { UrgentAlerts }
