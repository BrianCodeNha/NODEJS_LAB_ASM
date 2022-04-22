const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const diemDanhSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    todayWorkingHour: {
        type: Number,
        require: true
    },
    totalWorkingHour: {
        type: Number,
        require: true
    },
    history: [
        {
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
    }]
})

module.exports = mongoose.model('DiemDanh', diemDanhSchema)