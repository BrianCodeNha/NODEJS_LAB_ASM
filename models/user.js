const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    doB: {
        type: String,
        require: true
    },
    salaryScale: {
        type: Number,
        require: true
    },
    startDate: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    annualLeave: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    working: {
        type: Boolean,
        require: true
    },
    session: {
              
        history: {
            date: {
                type: String,
                require: true
            },
            startTime: {
                type: String,
                require: true
            },
            endTime: {
                type: String,
                require: true
            },
            duration: {
                type: Number,
                require: true,
            },
            location: {
                type: String,
                require: true
            }
        }
    }


})

module.exports = mongoose.model('User', userSchema)