const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const candidateModel = require("../models/candidateModel");



module.exports = {
    homeView: (req, res) => {
        try {
            res.render("home")
        }
        catch (err) {
            res.send(err.message);
        }
    },
    loginView: (req, res) => {
        try {
            res.render("login");
        }
        catch (err) {
            res.send(err.message);
        }
    },
    votingPanelView: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decoded = jwt.verify(token, "6wh74hk")
            const user = await userModel.findOne({ email: decoded.email });
            const candidate = await candidateModel.find({})
            if (!user) {
                res.redirect("/login")
            }
            else {
                res.render("votingPanel", { user: user, candidate:candidate });
            }

        }
        catch (err) {
            res.send(err.message);
        }
    },
    voteHandle: async(req,res)=>{
        try{
            const token = req.cookies.token;
            const decoded = jwt.verify(token,"6wh74hk");
            const email = decoded.email;
            const user = await userModel.findOne({ email:email })
            const candidate = await candidateModel.findOne({ _id: req.params.id });
            candidate.votes.push(user._id)
             candidate.save()
            res.redirect("/voting");
        }
        catch(err){
            res.send(err.message)
        }
    },
    addNewCandidateView: (req, res) => {
        try {
            res.render("addCandidate");
        }
        catch (err) {
            res.send(err.message);
        }
    },
    signUpHandle: async (req, res) => {
        const { name, email, phone, password } = req.body
        // console.log(req.body)
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const user = await userModel.create({
                        name: name,
                        email: email,
                        phone: phone,
                        password: hash
                    });

                })
            });
            const token = jwt.sign({ email: email }, "6wh74hk");
            res.cookie("token", token);
            res.render("votingPanel", { user: req.body });


        }
        catch (err) {
            res.send(err.message);
        }
    },
    signInHandle: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                res.redirect("/login");
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ email: email }, "6wh74hk");
                        res.cookie("token", token);
                        res.redirect("/voting");
                    }
                })
            }
        }
        catch (err) {
            res.send(err.message);
        }
    },
    logOut: (req, res) => {
        try {
            res.cookie("token", "");
            res.redirect("/login")
        }
        catch (err) {
            res.send(err.message);
        }
    }
}