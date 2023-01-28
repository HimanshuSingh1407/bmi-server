const User = require("../model/user.model");

//handlers or api
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const old_user = await User.findOne({ email });
    if (old_user) {
      return res
        .status(400)
        .send({ success: false, message: "User Already Register" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res
      .status(201)
      .send({ success: true, message: "User Register Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

//Login API
const login = async (req, res) => {
  try {
    console.log(req);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (password!==user.password) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Credentials" });
    }
    res
      .status(200)
      .send({ success: true, message: "Login Successfully", token:user._id });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { register, login };
