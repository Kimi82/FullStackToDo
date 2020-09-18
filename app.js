const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const dbService = require('./dbService.js')


app.use(express.json());
app.use(express.urlencoded({ extended : false}));

 
//get all user
app.get('/user/get', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUsers()
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.post('/user/add', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.addUser(request.body.username, request.body.email, request.body.password)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})



app.listen(process.env.PORT, () =>console.log("Server works..."));







