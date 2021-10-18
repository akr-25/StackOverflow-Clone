const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routers/auth")
const userRoute = require("./routers/users.js")
const quesRoute = require("./routers/question")
const ansRoute = require("./routers/answer");
const app = express();

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 8800, () => {
            console.log("Listening on port 8800");
        })
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.post("/api/auth/register", (req,res)=>{
//     console.log(req.body);
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/question", quesRoute);
app.use("/api/answer", ansRoute);