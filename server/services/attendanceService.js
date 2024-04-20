const Students = require('../models/student')
const Users = require('../models/user')
const {Attendance }= require('../models')

const today = (new Date(Date.now()).toLocaleDateString())// dateof the day in dd/mm/yyyy

const getClassStudent = async (studentClass) => {
  // const getTodaysAttendance = await Attendance.find({markedAt: new Date()})

  // query the database to get the list of students in a class
  const classStudents = await Students.find({ class: studentClass })
  // This could be a middleware too...

  if (classStudents.length == 0) {
    throw new Error('The class selected is not valid')
  }
  // The logic there is that if there is a date like today's date it has been marked else not
  const isItToday = await Attendance.findOne({ markedAt: today })
  if (isItToday) { throw new Error('The attendance has been marked') }

  // return the list of students in a class
  const classStudent = []
  for (let i = 0; i < classStudents.length; i++) {
    const user = await Users.findOne({ _id: classStudents[i].user })
    const { _id, class: class_ } = classStudents[i]
    const data = { _id, class: class_, user }
    classStudent.push(data)
  }

  return classStudent
}

// To list of students present in a class
const getStudentsPresent = async () => {
  const studentsPresent = await Attendance.find({ markedAt: today, isPresent: true })
  return { studentsPresent, NoOfStudents: studentsPresent.length }
}

// To get the list of students absent in a class
const getStudentsAbsent = async () => {
  const studentsAbsent = await Attendance.find({ markedAt: today, isPresent: false })
  return { studentsAbsent, NoOfStudents: studentsAbsent.length }
}

// To save the attendance marked by teacher into the database.
const markAttendance = async (attendanceData, teacher_id) => {
    const { student_id, isPresent } = attendanceData;

  // Check if attendance has already been marked for the student today
  const existingAttendance = await Attendance.findOne({
    student: student_id,
    markedAt: today
  });

  console.log(today)
  // const classStudents = await Students.find({ class: studentClass})
  // // This could be a middleware too...

    // The logic there is that if there is a date like today's date it has been marked else not

  // if (existingAttendance) {
  //   throw new Error(`Attendance has already been marked for student ${student_id} today`);
  // }

  
  // //
  // for (let i = 0; i < attendanceData.length; i++) {
  //   const { student_id, isPresent } = attendanceData[i]
  //   const data = { student: student_id, isPresent, markedBy: teacher_id, markedAt: today }
  //   console.log(data)
  //   const attendanceMarked = new Attendance(data)
  //   await attendanceMarked.save()
  // }

  // If attendanceData is an array
  if (Array.isArray(attendanceData)) {
    for (let i = 0; i < attendanceData.length; i++) {
      const { student_id, isPresent } = attendanceData[i];

      // Check if attendance has already been marked for the student today
      const existingAttendance = await Attendance.findOne({
        student: student_id,
        markedAt: today
      });

      if (existingAttendance) {
        throw new Error(`Attendance has already been marked for student ${student_id} today`);
      }

      const data = { student: student_id, isPresent, markedBy: teacher_id, markedAt: today };
      console.log(data);
      const attendanceMarked = new Attendance(data);
      await attendanceMarked.save();
    }
  } else { // If attendanceData is an object
    const { student_id, isPresent } = attendanceData;

    // Check if attendance has already been marked for the student today
    const existingAttendance = await Attendance.findOne({
      student: student_id,
      markedAt: today
    });

    if (existingAttendance) {
      throw new Error(`Attendance has already been marked for student ${student_id} today`);
    }

    const data = { student: student_id, isPresent, markedBy: teacher_id, markedAt: today };
    console.log(data);
    const attendanceMarked = new Attendance(data);
    await attendanceMarked.save();
  }
}

module.exports = { getClassStudent, markAttendance, getStudentsAbsent, getStudentsPresent }
