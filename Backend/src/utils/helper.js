import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js";

export const paginate = async (model, page = 1, limit = 10, empLevel, query = {}) => {
    const skip = (page - 1) * limit;

    // Ensure the query includes the level filtering
    let filterQuery = { ...query, level: { $lte: empLevel } };

    const [data, totalCount] = await Promise.all([
        model.find(filterQuery).skip(skip).limit(limit).exec(), // Execute the query properly
        model.countDocuments(filterQuery) // Correct way to count documents
    ]);

    return {
        data,
        pagination: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: skip + limit < totalCount,
            hasPrevPage: page > 1
        }
    };
};

export const getLast7DaysAttendance = async (req, res) => {
    try {
      // Get today's date and set to end of day
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      // Calculate 7 days ago (including today, so subtract 6)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      
      // First get attendance data from database
      const attendanceData = await Attendance.aggregate([
        {
          $match: { date: { $gte: sevenDaysAgo, $lte: today } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalEmployees: { $sum: 1 },
            totalOnTime: { $sum: { $cond: [{ $eq: ["$status", "On-Time"] }, 1, 0] } },
            totalLate: { $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] } },
            totalAbsent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
            totalLeave: { $sum: { $cond: [{ $eq: ["$status", "Leave"] }, 1, 0] } },
          },
        },
        {
          $project: {
            day: "$_id",
            _id: 0,
            totalEmployees: 1,
            totalOnTime: 1,
            totalLate: 1,
            totalAbsent: 1,
            totalLeave: 1,
            OnTime: { $round: [{ $multiply: [{ $divide: ["$totalOnTime", "$totalEmployees"] }, 100] }, 2] },
            Late: { $round: [{ $multiply: [{ $divide: ["$totalLate", "$totalEmployees"] }, 100] }, 2] },
            Absent: { $round: [{ $multiply: [{ $divide: ["$totalAbsent", "$totalEmployees"] }, 100] }, 2] },
            Leave: { $round: [{ $multiply: [{ $divide: ["$totalLeave", "$totalEmployees"] }, 100] }, 2] },
          },
        },
      ]);
      
      // Generate array with all 7 days starting from today and going backwards
      const allDays = [];
      for (let i = 0; i < 7; i++) {
        // Start with today (i=0) and go backwards
        const currentDate = new Date();
        currentDate.setDate(today.getDate() - i);
        const dateString = currentDate.toISOString().substring(0, 10);
        
        // Find if we have data for this day
        const dayData = attendanceData.find(item => item.day === dateString);
        
        if (dayData) {
          allDays.push(dayData);
        } else {
          // Add empty data for days with no records
          allDays.push({
            day: dateString,
            totalEmployees: 0,
            totalOnTime: 0,
            totalLate: 0,
            totalAbsent: 0,
            totalLeave: 0,
            // In percentage
            OnTime: 0, 
            Late: 0,
            Absent: 0,
            Leave: 0
          });
        }
      }
      
      // Sort by date (ascending)
      allDays.sort((a, b) => a.day.localeCompare(b.day));
      
      return allDays;
    } catch (error) {
      console.log("error in getLast7DaysAttendance() : ", error.message);
      throw error;
    }
  };

  export const findAllEmployeesAttendance = async (date) => {
    try {
      // Set up the date range for today
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      // Get all employees
    const allEmployees = await Employee.find({}, "-password -email -phone").lean();
      
      // Get today's attendance records
      const attendanceRecords = await Attendance.find({
        date: { $gte: startOfDay, $lte: endOfDay }
      })
      
      // Create a simple lookup object
      const attendanceByEmployee = {};
      attendanceRecords.forEach(record => {
        attendanceByEmployee[record.employee] = record.status;
      });

      console.log(attendanceByEmployee)
      
      // Combine employee data with attendance status
      const result = allEmployees.map(employee => ({
        ...employee,
        status: attendanceByEmployee[employee._id] || "Absent"
      }));

      
      // console.log(result)
      
      return result;
    } catch (error) {
      console.log("Error:", error.message);
      throw error;
    }
  };