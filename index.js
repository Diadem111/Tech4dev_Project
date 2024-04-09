const express = require("express")

require("dotenv").config()
// const config = require("./server/config/env")()
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./server/config/db")
const routes = require("./server/routes")
const SERVER_PORT = process.env.PORT

const app = express()
connectDB()
app.use(express.json())
app.use("/", routes)
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
); app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const PORT = SERVER_PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))