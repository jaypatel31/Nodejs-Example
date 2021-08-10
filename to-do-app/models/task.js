const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
       type:String,
       required:[true, 'Please Provide Task Name'],
       trim:true,
       maxlength:[20, 'Cannot be more than 20 characters']
    },
    completed: {
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('Task',TaskSchema);