const classSchedule = require("../models/classSchedule");


const getScheduleByCurrentWeek  =  async (startTime, endTime) => {
    // find from the database by start and end time such that it will return all schedule that it is equal or less than end time
    const scheduleForTheWeek = await classSchedule.find({
        date: { $gte: startTime, $lte: endTime }
    })
  // check if there is a schedule for the week
  if (scheduleForTheWeek.length === 0) throw new Error(`No schedule available for this current week`)
  return scheduleForTheWeek
} 


const getAllClassSchedule = async (requestUser) => {
    // ensure the user isLoggedIn
    if (!requestUser) throw new Error(`Unauthorized`)

    // get all the schedule
    const classTimeTable = await classSchedule.find()
    if (!classTimeTable) throw new Error(`No class-schedule found `)
    return classTimeTable
}


const getClassScheduleByClass = async (requestUser, requestRole, requestClass) => {
    // ensure the user isLoggedIn and is a student 
    if (!requestUser || requestRole != "student") throw new Error(`Unauthorized: Only student can view`)

    // get the class of the loggedIn student
    const studentClass = requestClass;

    // filter the schema by student class

    const uniqueClassSchedule = await classSchedule.find({ class: studentClass })
    return uniqueClassSchedule
}


const getClassScheduleById = async (scheduleId) => {
    const getTimeTable = await classSchedule.findOne({ _id: scheduleId })
    if (!getTimeTable) throw new Error(`class-schedule not found`)
    return getTimeTable
}

const getClassScheduleByIdAndUpdate = async (scheduleId, updateBody) => {
    //    update schedule by id
    if (!scheduleId) throw new Error(`class Schedule  not found: ${scheduleId} `)
    const updateById = await classSchedule.findByIdAndUpdate(scheduleId, updateBody, {
        new: true,
        $set: updateBody
    })
    return updateById
}

const getClassScheduleByIdAndDelete = async (scheduleId) => {
    // find if the schedule exist 
    if (!scheduleId) throw new Error(` class Schedule doesn't exist`)

    const deleteSchedule = await classSchedule.findByIdAndDelete(scheduleId)
    return deleteSchedule
}


module.exports = {
    getScheduleByCurrentWeek,
    getAllClassSchedule,
    getClassScheduleByClass,
    getClassScheduleById,
    getClassScheduleByIdAndUpdate,
    getClassScheduleByIdAndDelete,
}