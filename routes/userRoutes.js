const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const strictToLoggedInUserOnly = require("../middlewares/loggedInCheck");
const adminController = require("../controllers/adminController");





//GET Requests
router.get("/", userController.homeView);
router.get("/login", userController.loginView);
router.get("/voting",strictToLoggedInUserOnly, userController.votingPanelView);
router.get("/logout", userController.logOut);
router.get("/:id", strictToLoggedInUserOnly,userController.voteHandle)



//POST Requests
router.post("/signup", userController.signUpHandle);
router.post("/login", userController.signInHandle);













module.exports = router;