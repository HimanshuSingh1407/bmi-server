const { Schema, model } = require("mongoose");



const bmiModel = new Schema({
  bmiValue: {
    type: String,
    required: [true, "Please Enter BMI"],
    trim: true,
  },
  owner: {
    ref:"User",
    type: Schema.Types.ObjectId
  }
});


const Bmi = model("bmi", bmiModel);

module.exports = Bmi;
