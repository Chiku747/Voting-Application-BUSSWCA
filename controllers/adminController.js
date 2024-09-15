const jwt = require("jsonwebtoken");
const candidateModel = require("../models/candidateModel");
module.exports = {
    adminView: async(req, res) => {
        try {
            if (req.body.email == "tarasbesra49@gmail.com") {
                const candidate = await candidateModel.find({})
                const admin = req.body
                const token = jwt.sign({ email: req.body.email }, "6wh74hk");
                res.cookie("token", token);
                res.render("admin", { admin: admin, candidate:candidate });

            }
            else {
                res.send("You are not an Admin")
            }

        }
        catch (err) {
            res.send(err.message)
        }
    },
    addCandidateView: (req, res) => {
        res.render("addCandidate")
    },
    addCandidateHandle: async (req, res) => {
        const { name } = req.body
        try {
            const candidate = await candidateModel.create({
                name: name
            });
            res.redirect("/admin/addCandidate");
        }
        catch(err){
            res.send(err.message);
        }
    }
   
}