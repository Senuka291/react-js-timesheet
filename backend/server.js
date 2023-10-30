//Volunteer server
var express = require("express");
var app = express();
var cors = require("cors")
var connection = require('./connection');

app.use(express.json());
app.use(cors());
app.get('/volunteers', function(req, res) {
    let sql = "SELECT * from db.volunteer;";
    connection.query(sql, function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post("/volunteers/add", function(req, res) {
    const {staffId, name, email, volunteer, staff, streetAddress, city, state, zipcode} = req.body;
    const sqlInsert = "INSERT INTO db.volunteer (staffId, name, email, volunteer, staff, streetAddress, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(sqlInsert, [staffId, name, email, volunteer, staff, streetAddress, city, state, zipcode], (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Good job!");
        }
    })
})


//Grant server

app.get('/grants', function(req, res) {
    let sql = "SELECT * from db.grant;";
    connection.query(sql, function(err, results){
        if (err) throw err;
        res.send(results);
    });
});
app.post("/grants/add", function(req, res) {
    const {grantId, category, name, description, startDate, dueDate} = req.body;
    const sqlInsert = "INSERT INTO db.grant (grantId, category, name, description, startDate, dueDate) VALUES (?, ?, ?, ?, ?, ?);";
    connection.query(sqlInsert, [grantId, category, name, description, startDate, dueDate], (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Good job!");
        }
    })
})
//Timesheet/reporting server
app.get("/reporting", function(req, res) {
    let sql = "SELECT * from db.timesheet;";
    connection.query(sql, function(err, results){
        if (err) throw err;
        res.send(results);
    });
})

app.post("/reporting/add", function(req, res) {
    const {tsId, staffId, date, isVolunteer, isStaff, grantId, hours, miles, meals, lodging, workDescription, grantCategory} = req.body;
    const sqlInsert = "INSERT INTO db.timesheet (tsId, staffId, date, isVolunteer, isStaff, grantId, hours, miles, meals, lodging, workDescription, grantCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(sqlInsert, [tsId, staffId, date, isVolunteer, isStaff, grantId, hours, miles, meals, lodging, workDescription, grantCategory], (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Good job!");
        }
    })
})
app.listen(3305, function(){
    console.log('App Listening on port 3305');
});
