const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const connectDB = require("./config/db") 
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const {v4: uuidv4} = require("uuid")
const session = require("express-session")
const MongoStore = require("connect-mongo")



//load config
dotenv.config({path: "./config/config.env"})

//connect DB
connectDB()


const app = express()


//BodyParser Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
else {
    app.use(morgan("start"))
} 


//static folder
app.use(express.static(path.join(__dirname, "public")))

//Sessions Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
    },
    expire_on_close: false,
    secure: app.get('NODE_ENV') === 'development'? true:false,
    SameSite: 'none', 
    credentials: 'include',
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 86400000,
        // autoRemove: "native",
        // touchAfter: 24 * 3600,
    })
}))


//CORS middleware
const corsOptions = {
    origin: ["https://dholak-wedding-planning-app-client-2i0kdo3wh.vercel.app", "https://dholak-wedding-planning-app-client.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    headers: ["Content-Type"],
    credentials: true,
}

app.use(cors(corsOptions))


//Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/boards", require("./routes/boards"))
app.use("/users", require("./routes/users"))
app.use("/lists", require("./routes/lists"))
app.use("/notifications", require("./routes/notifications"))


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

