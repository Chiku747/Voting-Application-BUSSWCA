

module.exports = function strictToLoggedInUserOnly(req,res, next){
        try{
            if(!req.cookies||req.cookies.token == null || req.cookies.token === "" ){
                res.redirect("/login");
            }
            else{
                next()
            }
        }
        catch(err){
            res.send(err.message)
        }
}
