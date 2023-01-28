const express = require("express");
const { setBmi, getBmi } = require("../api/bmi.api");
const { isAuth } = require("../middleware/isAuth");


const bmiRoutes = express.Router();

bmiRoutes.post("/setBmi", isAuth, setBmi);
bmiRoutes.get("/getBmi", isAuth, getBmi);

module.exports = bmiRoutes;
