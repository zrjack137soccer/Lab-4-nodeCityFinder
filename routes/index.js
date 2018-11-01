var express = require('express');
var router = express.Router();
const https = require('https');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});
router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split("\n");
    for(var i = 0; i < cities.length; i++) {
        var result = cities[i].search(myRe);
        if(result != -1) {
        //console.log(cities[i]);
        }
    }
    var myRe = new RegExp("^" + req.query.q);
    //console.log(myRe);
    var jsonresult = [];
for(var i = 0; i < cities.length; i++) {
  var result = cities[i].search(myRe); 
  if(result != -1) {
    //console.log(cities[i]);
    jsonresult.push({city:cities[i]});
  } 
}   
res.status(200).json(jsonresult);
    });
    
    
  });

router.get('/owlbot',function(req, res, next) {
    var myUrl = "https://owlbot.info/api/v1/dictionary/";
    console.log("query: ", req.query);
    console.log("res: ", res);
    myUrl += req.query['q'];
    myUrl += "?format=json";
    console.log("after myUrl: ", myUrl);
    request(myUrl).pipe(res);
});

module.exports = router;
