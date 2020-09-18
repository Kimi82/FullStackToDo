const mysql = require('mysql');
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect((err) => {
    if(err) console.log(err.message)
})


class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllUsers(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM users";
                
                db.query(query, (err, results) =>{
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch(err){
            console.log(err)
        }
    }


    async addUser(username, email, password){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?) ";
                db.query(query, [username, email, password], (err, results) =>{
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = DbService;