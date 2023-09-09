const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String, // Use String instead of 'string'
        required: true
    },
    lastname: {
        type: String, // Use String instead of 'string'
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
