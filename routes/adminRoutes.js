const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const strictToAdminOnly = require("../middlewares/adminCheck");



//GET Requests
router.get("/", adminController.adminView);
router.get("/addCandidate", strictToAdminOnly,adminController.addCandidateView);



//POST Requests
router.post("/adminLogin",adminController.adminView);
router.post("/addnewcandidate", strictToAdminOnly,adminController.addCandidateHandle);





module.exports = router;