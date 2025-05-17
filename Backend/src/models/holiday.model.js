import mongoose, {Schema} from "mongoose";

const holidaySchema = new Schema({
    date : {
        type : Date,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

const Holiday = mongoose.model("Holiday", holidaySchema);
export default Holiday;