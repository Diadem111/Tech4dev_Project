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
    confirmPassword: {
      type: String
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    // religion: {
    //   type: String
    // },
    // stateOfOrigin: {
    //   type: String
    // },
    // nationality: {
    //   type: String
    // },
    // maritalStatus: {
    //   type: String,
    //   enum: ['single', 'married', 'widowed']
    // },
    phoneNumber: {
      type: String
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
    refreshToken: String
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
const User = mongoose.model('users', UserSchema)

module.exports = User
