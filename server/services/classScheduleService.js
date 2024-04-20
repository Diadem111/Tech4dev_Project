const {ClassSchedule} = require("../models");


const getScheduleByCurrentWeek  =  async (startTime, endTime) => {
    // find from the database by start and end time such that it will return all schedule that it is equal or less than end time
    const scheduleForTheWeek = await ClassSchedule.find({
        date: { $gte: startTime, $lte: endTime }
    })
  // check if there is a schedule for the week
  if (scheduleForTheWeek.length === 0) throw new Error(`No schedule available for this current week`)
  return scheduleForTheWeek
} 


const getAllClassSchedule = async (requestUser) => {
    // ensure the user isLoggedIn
    // if (!requestUser) throw new Error(`Unauthorized`)

    // get all the schedule
    const classTimeTable = await ClassSchedule.find()
    console.log(classTimeTable)
    if (!classTimeTable) throw new Error(`No class-schedule found `)
    return classTimeTable
}

const getClassScheduleByClass = async (requestUser, requestRole) => {
    // ensure the user isLoggedIn and is a student 
    // if (!requestUser || requestRole != "student") throw new Error(`Unauthorized: Only student can view`)

    let studentClass = requestUser.class;
    // get the class of the loggedIn student
    // const studentClass = requestClass;

    // filter the schema by student class

    const uniqueClassSchedule = await ClassSchedule.find({ class: studentClass })
    return uniqueClassSchedule
}


const getClassScheduleById = async (scheduleId) => {
    const getTimeTable = await ClassSchedule.findOne({ _id: scheduleId })
    if (!getTimeTable) throw new Error(`class-schedule not found`)
    return getTimeTable
}

const getClassScheduleByIdAndUpdate = async (scheduleId, updateBody) => {
    //    update schedule by id
    if (!scheduleId) throw new Error(`class Schedule  not found: ${scheduleId} `)
    const updateById = await ClassSchedule.findByIdAndUpdate(scheduleId, updateBody, {
        new: true,
        $set: updateBody
    })
    return updateById
}

const getClassScheduleByIdAndDelete = async (scheduleId) => {
    // find if the schedule exist 
    if (!scheduleId) throw new Error(` class Schedule doesn't exist`)

    const deleteSchedule = await ClassSchedule.findByIdAndDelete(scheduleId)
    return deleteSchedule
}


// get class-chedule by filter 
const getScheduleByFilter = async (filter) => {
    console.log(filter)
    const query = {};
  
    // // Iterate through each key-value pair in the filter object
    // // Iterate through each key-value pair in the filter object
    for (const key in filter) {
      if (Object.hasOwnProperty.call(filter, key) && key !== '_id') {
        // Exclude the _id key and construct the query based on other key-value pairs
        query[key] = filter[key];
      }
    }
    console.log(query)
    const schedules = await ClassSchedule.find(query)
    if (
      !schedules || schedules.length === 0
    ) throw new Error('No schedule found for the filter you provided')
    return schedules
  }
  

module.exports = {
    getScheduleByCurrentWeek,
    // getAllClassSchedule
    getAllClassSchedule,
    getClassScheduleByClass,
    getClassScheduleById,
    getClassScheduleByIdAndUpdate,
    getClassScheduleByIdAndDelete,
    getScheduleByFilter
}