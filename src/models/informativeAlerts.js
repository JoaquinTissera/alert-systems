const { Alerts } = require('../abstract/alerts.js')

class InformativeAlerts extends Alerts {
    constructor(message, expirationDate, personalAlert = false){
        super(message, expirationDate, "Informative", personalAlert)
    }
}

module.exports = { InformativeAlerts }