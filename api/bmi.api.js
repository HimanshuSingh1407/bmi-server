const User = require("../model/user.model");
const Bmi = require("../model/bmi.model");

//handlers or api
const setBmi = async (req, res) => {
  try {
    const { height, weight } = req.body;
    const calculatedBmi = parseInt(weight) / parseInt(height);
    const bmi = await Bmi.create({
      bmiValue: calculatedBmi,
      owner: req.user._id,
    });
    const user = await User.findById(req.user._id);
    user.bmis.push(bmi._id);
    await user.save();
    res.status(201).send({ success: true, message: "BMI Calculated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

const getBmi = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const bmiArr = [];
    for(let i=0; i<user.bmis.length; i++)
    {
        console.log(i)
        let bmi = await Bmi.findOne({_id: i});
        bmiArr.push(bmi)
    }
    const name = user.name
    res.status(200).send({ success: true, name, bmiArr });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { setBmi, getBmi };
