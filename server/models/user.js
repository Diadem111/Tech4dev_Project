const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require("bcrypt");


const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    surName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    // dateOfBirth: {
    //   type: Date
    // },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    email: {
      type: String,
      unique: true,
      index: true
    },
    password: {
      type: String
    },
   
    address: {
     type:String
    },
    
   
    passport:{
     type:String
        },
    otp: {
      type: String
    },
    otpExpiry: {
      type: Date
    },
    codeReset: { type: String, default: null },
    codeExpire: { type: Date, default: null },
    
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
  },
  student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
  },
  application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
  },

    // refreshToken: String
  },
  

  { timestamps: true }
)


const saltRound = 10
UserSchema.pre("save", function (next) {
  // console.log(this);
  bcrypt.hash(this.password, saltRound, (err, hashPassword) => {
    if(err) {
      console.log(err)
    }else {
      this.password = hashPassword
      next()
    }
  })
})

UserSchema.methods.validatePassword = function (password, callback) {
  // console.log(this)
  // console.log(password)
  bcrypt.compare(password, this.password, (err, same) => {
      if (!err) {
          callback(err, same)
      } else {
          next()
      }
  })
}

const User = mongoose.model('users', UserSchema)

module.exports = User
