var express = require("express");
var exe = require("./db");
var mail = require("./send_mail");
var router = express.Router();

router.get("/", async function(req,res){

    var intro = await exe(`SELECT * FROM introduction`);
    var edu = await exe(`SELECT * FROM eduction`);
    var skills = await exe(`SELECT * FROM skill`);
    var obj = {"intro":intro[0], "edu":edu, "skills":skills}
    res.render("user/home.ejs",obj);
})

router.post("/save_contact_details",function(req,res){
    res.send(req.body);
})

module.exports = router;