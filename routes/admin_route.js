var express = require("express");
var exe = require("./db");
var router = express.Router();


router.get("/", function(req,res){
    res.render("admin/home.ejs");
})

router.get("/introduction",async function(req,res){
    var sql= `SELECT * FROM introduction`;
    var data = await exe(sql);
    var obj = {"app_info":data[0]}
    res.render("admin/introduction.ejs",obj);
})

router.post("/update_introduction",async function(req,res){
    var d = req.body;
    if(req.files)
            {
                if(req.files.user_photo)
                {
                    var user_photo = new Date().getTime()+req.files.user_photo.name
                    req.files.user_photo.mv("public/"+user_photo);
                    var data = await exe(`UPDATE introduction SET user_photo = '${user_photo}' WHERE intro_id ='${d.intro_id}'`);
                }
                if(req.files.resume)
                {
                    var resume = new Date().getTime()+req.files.resume;
                    req.files.resume.mv("public/"+resume);
                    var data = await exe(`UPDATE introduction SET resume = '${resume}' WHERE intro_id ='${d.intro_id}'`);
                }
                }
              var sql = `UPDATE introduction SET
                    user_name = '${d.user_name}',
                    tag_line = '${d.tag_line}',
                    user_mobile = '${d.user_mobile}',
                    user_email = '${d.user_email}',
                    linkedin_link = '${d.linkedin_link}',
                    instagram_link = '${d.instagram_link}',
                    facebook_link = '${d.facebook_link}',
                    twitter_link = '${d.twitter_link}',
                    about_details = '${d.about_details}'
                    WHERE intro_id = '${d.intro_id}'`;

                    var data = await exe(sql);
                    // res.send(data);
                    res.redirect("/admin/introduction");
                         
      
});

// eduction
router.get("/eduction",async function(req,res){
    var sql = `SELECT * FROM eduction`;
    var data = await exe(sql);
    var obj = {"list":data}
    res.render("admin/eduction.ejs",obj);
})

router.post("/save_eduction",async function(req,res){
    // res.send(req.body);
    var d = req.body;
    var sql = `INSERT INTO eduction(university, qualification, passing_year, percentage)VALUES('${d.university}','${d.qualification}','${d.passing_year}','${d.percentage}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/eduction")
})

router.get("/edit_equction/:id", async function(req,res){
    var id = req.params.id;
    var sql = `SELECT * FROM eduction WHERE eduction_id = '${id}'`;
    var data = await exe(sql);
    var obj = {"edu_info":data[0]}
    res.render("admin/edit_eduction.ejs",obj)
})

router.post("/update_eduction", async function(req,res){
    // res.send(req.body);
    var d = req.body;
    var sql = `UPDATE eduction SET university = '${d.university}',qualification = '${d.qualification}', passing_year = '${d.passing_year}', percentage = '${d.percentage}' WHERE eduction_id = '${d.eduction_id}' `;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/eduction")
})

router.get("/delete_eduction/:id",async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM eduction WHERE eduction_id = '${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/eduction");
})

// skills
router.get("/skills", async function(req,res){
    var sql = `SELECT * FROM skill`;
    var data = await exe(sql);
    var obj = {"skills":data}
    res.render("admin/skills.ejs",obj);
})

router.post("/save_skills",async function(req,res){
    // res.send(req.files);
    var d = req.body;
    var skill_image = new Date().getTime()+req.files.skill_image.name
    req.files.skill_image.mv("public/"+skill_image);

    var sql = `INSERT INTO skill(skill_image, skill_title)VALUES('${skill_image}','${d.skill_title}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/skills");
})

router.get("/edit_skill/:id",async function(req,res){
    var id= req.params.id;
    var sql = `SELECT * FROM skill WHERE skill_id = '${id}'`;
    var data = await exe(sql);
    var obj = {"skill_info":data[0]}
    res.render("admin/edit_skill.ejs",obj)
})
router.post("/update_skills",async function(req,res){
    var d =req.body;
    if(req.files){
        var skill_image = new Date().getTime()+req.files.skill_image.name
        req.files.skill_image.mv("public/"+skill_image);

        var data = await exe(`UPDATE skill SET skill_image = '${skill_image}' WHERE skill_id = '${d.skill_id}'`);
    }
    var sql = `UPDATE skill SET skill_title = '${d.skill_title}' WHERE skill_id = '${d.skill_id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/skills");
})

router.get("/delete_skill/:id", async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM skill WHERE skill_id = '${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/skills");
})

// project
router.get("/project", async function(req,res){
    var sql = `SELECT * FROM project`;
    var data = await exe(sql);
    var obj = {"pro":data}
    res.render("admin/project.ejs",obj);
})

router.post("/save_project", async function(req,res){
    // res.send(req.files);
    var d = req.body;
    var project_photo = new Date().getTime()+req.files.project_photo.name
    req.files.project_photo.mv("public/"+project_photo);

    var sql = `INSERT INTO project(project_photo, project_title, github_link, project_details)VALUES('${project_photo}','${d.project_title}','${d.github_link}','${d.project_details}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/project");

})
router.get("/edit_project/:id", async function(req,res){
    var id = req.params.id;
    var sql = `SELECT * FROM project WHERE project_id = '${id}'`;
    var data = await exe(sql);
    var obj ={"pro_info" :data[0]}
    res.render("admin/edit_project.ejs",obj)
})

router.post("/update_project",async function(req,res){
    var d = req.body;
    if(req.files)
    {
        var project_photo = new Date().getTime()+req.files.project_photo.name
        req.files.project_photo.mv("public/"+project_photo);
         
        var data = await exe(`UPDATE project SET project_photo ='${project_photo}' WHERE project_id = '${d.project_id}'`);
    }

    var sql = `UPDATE project SET project_title = '${d.project_title}', github_link = '${d.github_link}', project_details = '${d.project_details}' WHERE project_id = '${d.project_id}'`;

    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/project");
})

router.get("/delete_project/:id", async function(req,res){
    var id = req.params.id;
    var sql = `DELETE FROM project WHERE project_id = '${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/project");

})


module.exports = router;

//  CREATE TABLE introduction(intro_id INT PRIMARY KEY AUTO_INCREMENT,
// user_name VARCHAR(100),
// tag_line VARCHAR(100),
// user_mobile VARCHAR(10),
// user_email  VARCHAR(100),
// linkedin_link VARCHAR(200),
// instagram_link VARCHAR(200),
// facebook_link  VARCHAR(200),
// twitter_link VARCHAR(200),
// about_details TEXT
// )