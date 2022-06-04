const mongoose = require('mongoose')

const Log = new mongoose.Schema(
    {
        websiteURL: {type: String, required: true},
        downAt: {type: Date, required: true},
        duration: {type: Number, required: true},
    }, 
    {collection: 'logs'}
)

const model = mongoose.model('Log', Log)

module.exports = model;