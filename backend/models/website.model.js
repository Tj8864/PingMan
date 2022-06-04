const mongoose = require('mongoose')

const Website = new mongoose.Schema(
    {
        websiteURL: {type: String, required: true, unique: true},
        totalDowntime: {type: Number, required: true},
        users: {type: [String], required: true},
        monitoringStartTime: {type: Date, required: true},
        lastUpTime: {type: Date, required: true},
        isUp: {type: Boolean, required: true},
        lastCheck: {type: Date, required: true},
        uptimePercent: {type: Number, required: true},
    }, 
    {collection: 'websites'}
)

const WebsiteModel = mongoose.model('WebsiteModel', Website)

module.exports = WebsiteModel;