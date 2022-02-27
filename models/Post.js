const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    nativeLanguage: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)