import mongoose,{Schema} from "mongoose";

const dailyTaskSchema = new Schema({
    employee : {
        type : Schema.Types.ObjectId,
        ref : "Employee",
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    employeeId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    teamNo : {
        type : Number,
        default : null
    },
    numberOfCalls : {
        type : Number
    },
    numberOfHiring : {
        type : Number
    },
    numberOfOnboarding : {
        type : Number
    },
    totalTechTeamHiring : {
        type : Number
    },
    jobPostLink : {
        type : String
    },
    specificPostLink : {
        type : String
    },
    updatedInGroup : {
        type : Boolean
    },
    updatedInSheet : {
        type : Boolean
    },
    updateEmailSent : {
        type : Boolean
    },
    attendedMeet : {
        type : Boolean
    },
    dailyTeamMeet : {
        type : Boolean
    },
    additionalTask : {
        type : String
    },
    issuesAndIdeas : {
        type : String
    },
    teamQueries : {
        type : String
    },
},
{ timestamps: true });

const DailyTask = mongoose.model("DailyTask", dailyTaskSchema);
export default DailyTask;