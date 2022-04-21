const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const name = req.body.city;
    const id = "919ef1590cb7fe6bcb78a5f62a43fe4b";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=919ef1590cb7fe6bcb78a5f62a43fe4b&units=metric"
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      console.log(data);
      const javascript = JSON.parse(data);
      const temprature = javascript.main.temp;
      const description = javascript.weather[0].description;
      const icon = javascript.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<p>The description is</p>"+description);
      res.write("<h1>The Weather in "+ name +" is</h1> " + temprature);
      res.write("<img src=" + imageurl +">")
      res.send();

    })
 })
})

app.listen(8080);
