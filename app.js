const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");



app.use(express.urlencoded({ extended: true  }));
app.use(cookieParser())

//Configuring Views
app.set("view engine","ejs");

//Configuring Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoute);
app.use("/admin", adminRoute);




app.listen(4000);