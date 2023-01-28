const { Schema, model } = require("mongoose");


const userModel = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Email"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    trim: true,
  },
  bmis: [{
    ref: "Bmi",
    type: Schema.Types.ObjectId
  }]
});


const User = model("user", userModel);

module.exports = User;
