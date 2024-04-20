const attendanceService = require('../services/attendanceService')
const attendance = require('../models/attendance')

const getClassStudents = async (req, res) => {
  console.log(req.params)

  try {
    const studentClass = req.params.class
    console.log(studentClass)
    const classStudents = await attendanceService.getClassStudent(studentClass)
    res.status(200).json({ message: 'class students found', data: classStudents })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong...', error: error.message })
  }
}

const getStudentsPresentData = async (req, res) => {
  try {
    const studentsPresent = await attendanceService.getStudentsPresent()
    res.status(200).json({ message: 'STUDENT PRESENT IN CLASS TODAY', data: studentsPresent })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong....', error: error.message })
  }
}

const getStudentsAbsentData = async (req, res) => {
  try {
    const studentsAbsent = await attendanceService.getStudentsAbsent()
    res.status(200).json({ message: 'STUDENT ABSENT IN CLASS TODAY', data: studentsAbsent })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong....', error: error.message })
  }
}

const markAttendance = async (req, res) => {
  try {
    // isTeacher()
  console.log(req.user._id)
    const attendanceData = req.body
    console.log(attendanceData)
    // const teacher_id = req.user._id
    const teacher_id = req.user._id
    const classStudents = await attendanceService.markAttendance(attendanceData, teacher_id)
    res.status(200).json({ message: 'Attendance marked successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong....', error: error.message })
  }
}

module.exports = { getClassStudents, getStudentsAbsentData, getStudentsPresentData, markAttendance }
