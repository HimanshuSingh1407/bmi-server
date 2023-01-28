const User = require("../model/user.model");

const isAuth = async (req, res, next) => {
  try {
    console.log(req.headers, req.body);
    if (req.headers?.token) {
      const { token } = req.headers;
      const user = await User.findById(token);
      req.user = user
      next();
    } else {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { isAuth };
