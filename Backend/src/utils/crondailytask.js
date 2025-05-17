import DailyTask from "../models/dailyTask.model.js";
import cron from "node-cron";
import Employee from "../models/employee.model.js";
import ApiError from "./customError.js";

cron.schedule(
	"0 0 * * *",
	async () => {
		console.log("Running daily cleanup job...");

		try {
            // Delete Employees whose tenure is lastWorking days + 2
            let twoDaysAgo = new Date();
            twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 2);
            twoDaysAgo.setUTCHours(0, 0, 0, 0);

            const deletedEmployees = await Employee.deleteMany({
                lastWorkingDate : {
                    $lte : twoDaysAgo
                }
            })
            
            // Delete dailyTasks older than a month
            let oneMonthAgo = new Date();
            oneMonthAgo.setUTCMonth(oneMonthAgo.getUTCMonth() - 1);
            oneMonthAgo.setUTCHours(0, 0, 0, 0);

            const deleteDailyTasks = await DailyTask.deleteMany({
                createdAt : {
                    $lte : oneMonthAgo
                }
            })
            console.log(`Cleared ${deleteDailyTasks.deletedCount} daily tasks records which was older than ${oneMonthAgo.toISOString().split("T")[0]}`);

			console.log("Cleanup job completed");
		} catch (err) {
			return new ApiError(err.message || "Some error occured in cleanup job", 500);
		}
	},
	{
		timezone: "Asia/Kolkata",
	}
);
