const express = require("express");
const http = require("http");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");


});

app.post('/', (req, res) => {
    console.log(req.body.cityName);
    const apiKey = "55ac5c584ff8bf5c6b35049608ecff56";
    const query = req.body.cityName;
    const units = "metric";
    const url =
        "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";


    http.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> Weather Description " + weatherDescription + "</p>");
            res.write(
                "<h1> Temperature In " + query + " " + temp + " Degrees Celsius</h1>"
            );
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
});


app.listen(3000, function() {
    console.log("server running port 3000");
});