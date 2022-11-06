import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import Income from './routes/income_r.js';
import Requset from './routes/request_r.js';
import User from './routes/user_r.js';
import companyRouter from './routes/companyRouter.js';


import http from 'http';
import { Server } from "socket.io";

const app = express()
    , httpServer = http.createServer(app)
    , io = new Server(httpServer,{
        cors:{
            origin: "*",
            methods: "*"
        }
});


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', User);
app.use('/requests', Requset);
app.use('/incomes', Income);
app.use('/company',companyRouter);

const URL = 'mongodb+srv://Jayani:Jayani123@sunmaster.5lgr4f5.mongodb.net/SunMaster?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(URL).then(() => {
    console.log(`Server is running on port`);
    httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
}).catch((error) => {
    console.error(error)
})





