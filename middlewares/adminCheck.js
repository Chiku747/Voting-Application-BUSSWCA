const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.cookies.token

    if (!token || token == "") {
        res.send("No token");
    }
    else {
        const adminToken = jwt.verify(token, "6wh74hk");
        if (adminToken.email == "tarasbesra49@gmail.com") {
            next()
        }
        else{
            res.send("You are not an Admin");
        }
    }
}