const router = require("express").Router();
const { signup, Login } = require("../controllers/Authcontrollers");
const {
  Signupvalidation,
  Loginvalidation,
} = require("../middleware/Authvalidation");


/* login */
router.post("/login", Loginvalidation, Login);
/* sign up */
router.post("/signup", Signupvalidation, signup);

module.exports = router;