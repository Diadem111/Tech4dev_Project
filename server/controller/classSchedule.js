const express = require("express");
const classSchedule = require("../models/classSchedule");
const { classScheduleService } = require('../services')



const home = (req, res) => {
  res.status(200).json({
      status: "ok",
      server: " welcome to the home page",
  });
}

const changeTimeSTtringToDate = (timeString) => {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  console.log('Hours:', hours, 'Minutes:', minutes);

  let hourFormat = hours;
  if (period === "PM" && hours < 12) {
    hourFormat += 12;
  } else if (period === "AM" && hours === 12) {
    hourFormat = 0;
  }
  console.log('Hours24:', hourFormat);

  const date = new Date();
  date.setHours(hourFormat, minutes, 0, 0);
  console.log((date.toLocaleTimeString()));

  return date.toLocaleTimeString();
  ;
}


// GET DAY OF THE WEEK FROM THE DATE 
const getDayOfTheWeek = (dayString) => {
  const date = new Date(dayString);
  console.log("day of the week", date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase())
  return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
}


async function ScheduleTimeTable(req, res) {
  try {
    const { subject, className, date, startTime, endTime, topic, color } = req.body;

    // save date in ISO format
    const currentDate = new Date(date)
    console.log(currentDate);

    // parse time strings into date objects
    const startTimeNum = changeTimeSTtringToDate(startTime);
    const endTimeNum = changeTimeSTtringToDate(endTime);


    // const teacher =  req.user.id;
    const result = new classSchedule({
      subject,
      className,
      date: currentDate,
      startTime: startTimeNum,
      endTime: endTimeNum,
      topic,
      day: getDayOfTheWeek(date),
      color
      //   teacher
    });

    await result.save();
    console.log(result)
    res.status(200).json({ message: "schedule saved", status: true })
  }
  catch (err) {
    console.log(err.message)
    res.status(400).json({ message: "err.message", error:err.message})
  }
}


// const getScheduleByCurrentWeek = async (req,res) => {
//   try {
//        // get start date of the week 
//        const start = new Date();
//        start.setDate(start.getDate() - start.getDay());

//        //    get end date of the week in ISO format
//        const end = new Date(start);
//        end.setDate(end.getDate() + 6);
//        // console.log(start);
//        // console.log(end);
 
//        const weeklySchedule = await classScheduleService.getScheduleByCurrentWeek(start, end)
//        return res.status(201).json({ message: "Schedule for the current week ", data: weeklySchedule })

//   }catch(err){
//     return res.status(500).json({ error: err.message })
//   }
// }



const getAllClassSchedule = async (req, res) => {
  try {
    // const user = req.user
    // console.log(user)
    const schedule = await classScheduleService.getAllClassSchedule()
    return res.status(201).json({ message: "success", schedule })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}



const getClassScheduleById = async (req, res) => {
  try {
    const id = req.params.id
    getscheduleById = await classScheduleService.getClassScheduleById(id)
    return res.status(201).json(getscheduleById)
  } catch (error) {
    return res.status(500).json({ error: error.message })

  }
}


const getClassScheduleByIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    // send id and update (i.e : the update coming from the frontend)
    updateById = await classScheduleService.getClassScheduleByIdAndUpdate(id, update)
    return res.status(201).json({ message: "success", newSchedule: updateById })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getClassScheduleByIdAndDelete = async (req, res) => {
  try {
    const id = req.params.id;
    deleteSchedule = await classScheduleService.getClassScheduleByIdAndDelete(id)
    return res.status(201).json({ message: "class-schedule deleted successfully" })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}


// get current class schedule by the class of the student
const getClassScheduleByClass = async (req, res) => {
    try {
      const getscheduleClass = await classScheduleService.getAllClassSchedule(req.user, req.user.role)
      return res.status(201).json(getscheduleClass)
    } catch (err) {
      return res.status(500).json({ error: err.message })
  
    }
  }
  
//   gwt schedule by current week

  async function getScheduleByCurrentWeek(req, res) {
    try {
        // get start date of the week 
        const start = new Date();
        start.setDate(start.getDate() - start.getDay());

        //    get end date of the week in ISO format
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        // console.log(start);
        // console.log(end);

        //    find from the database 
        const scheduleForTheWeek = await classSchedule.find({
            date: { $gte: start, $lte: end }
        })

        console.log(scheduleForTheWeek)

        // check if there is a schedule for the week
        if (scheduleForTheWeek.length === 0) {
            res.status(404).json({ message: "No schedule available for this current week" });

        } else {
            res.status(200).send({ message: "Schedule for the current week ", data: scheduleForTheWeek })
        }
    } catch (err) {
        console.log(err.message)
    }
}


// class scheudle by any filter
const getClassScheduleByFilter = async (req, res) => {
  try {
    console.log(req.query)
    filter = req.query
    // console.log(filter)
    const questions = await classScheduleService.getScheduleByFilter(filter)
    return res.status(200).json(questions)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}


module.exports = {
  home,
//   getScheduleByCurrentWeek,
  ScheduleTimeTable,
  getAllClassSchedule,
  // getClassScheduleByClass,
  getClassScheduleById,
  getClassScheduleByIdAndUpdate,
  getClassScheduleByIdAndDelete,
  getClassScheduleByClass ,
  getScheduleByCurrentWeek,
  getClassScheduleByFilter,
}