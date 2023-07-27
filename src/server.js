import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
var cors = require('cors')

require('dotenv').config();

let app = Express();

app.use(cors({ credentials: true, origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extends: true }))

viewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 2121;
app.listen(port, () => {
    console.log("Backend Nodejs is runing", port);
});