const express = require("express");
const bodyParser =  require("body-parser");
const fs = require("fs");

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

var users;

//json file containing the user data
// Read users.json file
fs.readFile("output.json", function(err, data) {
	// Check for errors
	if (err) throw err;
	// Converting to JSON
	users = JSON.parse(data);
});

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/userLogin", (req, res) => {
  res.send("The server is running at port 5000. Please make a post request.");
});

app.post('/userLogin', (req, res) => {
//Returns all information about the user;
var flag = 0;
for (var i=0 ; i < users.length ; i++)
{
    if (users[i].username === req.body.username) {
      flag=1;
        if(users[i].password === req.body.password){
          res.send("200");
          break;
        } else {
          res.send("404");
        }
    }
}
if(flag === 0){
  res.send("400");
}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
