import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    time : {
        type : Date,
        required : true,
        default : Date.now
    },
    employee : {
        type : Schema.Types.ObjectId,
        ref : "Employee"
    }
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;