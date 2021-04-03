const db=require('../models');
const Op = db.Sequelize.Op;
const { fn, col, cast } = db.sequelize;
const fs = require("fs");
const path = require("path");

let pdf = require("html-pdf");
let ejs = require("ejs");
const center = db.center;
const centerInfo = db.centerInfo;
const chp = db.chp;
const farmer = db.farmer;
const kormokorta = db.kormokorta;
const saao = db.saao;
const uddan = db.uddan;
const apa = db.apa;
const expense = db.expense;
const buildingDevelopment = db.buildingDevelopment;
const guardDevelopment = db.guardDevelopment;
const landDevelopment = db.landDevelopment;
const seedDevelopment = db.seedDevelopment;
const wallDevelopment = db.wallDevelopment;
const prodorshoni = db.prodorshoni;
const infoChp = db.infoChp;
const infoWorker = db.infoWorker;
const motivation = db.motivation;
const development = db.development;
const female = db.female;
const gardener = db.gardener;
const nurseryman = db.nurseryman;
const sprayman = db.sprayman;

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.centertable=async(req,res)=>{
    res.json({ message: "hello center" });
};

module.exports.allcenter=async(req,res)=>{
    res.json({ message: "hello center" });
};
module.exports.allCenterInfo=async(req,res)=>{
    await centerInfo.findAll()
    .then(data => {
        console.log(data);
        res.render('allCenterInfo', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('allCenterInfo', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })
};
module.exports.charaKolomFixed=async(req,res)=>{
    
    try {
        const charaKoloms= await charaKolom.findAll();
        const folMoshollas= await folMosholla.findAll();
        const winterVegs= await winterVeg.findAll();
        const otherFlowers= await otherFlower.findAll();
        const seasonalFlowers= await seasonalFlower.findAll();
        const summerVegs= await summerVeg.findAll();
        console.log("inside");
        res.render('charaKolomFixed', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'', record1: charaKoloms,record2: folMoshollas,record3:winterVegs ,record4: summerVegs,record5:otherFlowers  ,record6:seasonalFlowers  });
    }
    catch(err) {
        console.log("outside");
        res.render('charaKolomFixed', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'',record1: err,record2: err,record3: err,record4: err,record5: err,record6: err });
    }
    
};

module.exports.centerlogin=async(req,res)=>{
    res.render('center/login', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};

module.exports.centerloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        center.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "center";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/center/dashboard');
                    }
                    else{
                        return res.status(200).render('center/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('center/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // center.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , center.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/center/dashboard');
        //             }
        //             else{
        //                 res.redirect('/center/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('center/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.centerDashboard = async(req,res) => {
    console.log("Centerdashboard",res.locals.type);
    res.render('center/dashboard', { title: 'Year Round Fruit Production Central Management Software',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.centersignup=async(req,res)=>{
    res.render('center/signup', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};
module.exports.centersignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await center.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('center/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: The center is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('center/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createCenter = await center.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('center/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'Center Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//center controller
module.exports.center=async(req,res)=>{
    await centerInfo.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/centerinfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/centerinfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.centerYear=async(req,res)=>{
    await centerInfo.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/centerinfo/centerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/centerinfo/centerYear', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })

};

module.exports.centerForm=async(req,res)=>{
    res.render('center/centerinfo/centerForm', { title: 'সেন্টারের যোগাযোগ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.centerFormPost=async(req,res)=>{
    var center= req.body.center;
    var kormokorta= req.body.kormokorta;
    var podobi= req.body.podobi;
    var mobile= req.body.mobile;
    var email= req.body.email;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await centerInfo.create({
        center: center,
        kormokorta:kormokorta,
        podobi:podobi,
        mobile:mobile,
        email:email,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/center');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//center controller end

//chp controller
module.exports.chp=async(req,res)=>{
    await chp.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/chp/chp', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/chp/chp', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.chpYear=async(req,res)=>{
    await chp.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    
    .then(data => {
        res.render('center/chp/chpTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/chp/chpYear', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.chpForm=async(req,res)=>{
    res.render('center/chp/chpForm', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.chpFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await chp.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/chp');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfchp= async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//chp controller end

//farmer controller
module.exports.farmer=async(req,res)=>{
    await farmer.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/farmer/farmer', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/farmer/farmer', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.farmerYear=async(req,res)=>{
    await farmer.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/farmer/farmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/farmer/farmerYear', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.farmerForm=async(req,res)=>{
    res.render('center/farmer/farmerForm', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.farmerFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await farmer.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/farmer');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdffarmer = async (req, res) => {
    try {
    var data= await farmer.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/farmer", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//farmer controller end

//kormokorta controller
module.exports.kormokorta=async(req,res)=>{
    await kormokorta.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/kormokorta/kormokorta', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/kormokorta/kormokorta', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.kormokortaYear=async(req,res)=>{
    await kormokorta.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/kormokorta/kormokortaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/kormokorta/kormokortaYear', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.kormokortaForm=async(req,res)=>{
    res.render('center/kormokorta/kormokortaForm', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.kormokortaFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await kormokorta.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/kormokorta');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfkormokorta = async (req, res) => {
    try {
    var data= await kormokorta.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/kormokorta", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//kormokorta controller end

//saao controller
module.exports.saao=async(req,res)=>{
    await saao.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/saao/saao', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/saao/saao', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.saaoYear=async(req,res)=>{
    await saao.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/saao/saaoTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/saao/saaoYear', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.saaoForm=async(req,res)=>{
    res.render('center/saao/saaoForm', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.saaoFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await saao.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/saao');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfsaao = async (req, res) => {
    try {
    var data= await saao.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/saao", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//saao controller end

//uddan controller
module.exports.uddan=async(req,res)=>{
    await uddan.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/uddan/uddan', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/uddan/uddan', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.uddanYear=async(req,res)=>{
    await uddan.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/uddan/uddanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/uddan/uddanYear', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.uddanForm=async(req,res)=>{
    res.render('center/uddan/uddanForm', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.uddanFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await uddan.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/uddan');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfuddan = async (req, res) => {
    try {
    var data= await uddan.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/uddan", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//uddan controller end

//female controller
module.exports.female=async(req,res)=>{
    await female.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/female/female', { title: 'মহিলা উদ্যোক্তা প্রশিক্ষণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/female/female', { title: 'মহিলা উদ্যোক্তা প্রশিক্ষণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.femaleYear=async(req,res)=>{
    await female.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/female/femaleTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/female/femaleYear', { title: 'মহিলা উদ্যোক্তা প্রশিক্ষণ',success:'', records: err });
    })

};

module.exports.femaleForm=async(req,res)=>{
    res.render('center/female/femaleForm', { title: 'প্রদর্শনী কৃষক/নার্সারিম্যান/স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.femaleFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await female.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/female');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdffemale = async (req, res) => {
    try {
    var data= await female.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/female", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//female controller end

//gardener controller
module.exports.gardener=async(req,res)=>{
    await gardener.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/gardener/gardener', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/gardener/gardener', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.gardenerYear=async(req,res)=>{
    await gardener.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/gardener/gardenerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/gardener/gardenerYear', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.gardenerForm=async(req,res)=>{
    res.render('center/gardener/gardenerForm', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.gardenerFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await gardener.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/gardener');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfgardener = async (req, res) => {
    try {
    var data= await gardener.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/gardener", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//kormokorta controller end

//nurseryman controller
module.exports.nurseryman=async(req,res)=>{
    await nurseryman.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/nurseryman/nurseryman', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/nurseryman/nurseryman', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.nurserymanYear=async(req,res)=>{
    await nurseryman.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/nurseryman/nurserymanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/nurseryman/nurserymanYear', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.nurserymanForm=async(req,res)=>{
    res.render('center/nurseryman/nurserymanForm', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.nurserymanFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await nurseryman.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/nurseryman');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfnurseryman = async (req, res) => {
    try {
    var data= await nurseryman.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/nurseryman", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//nurseryman controller end

//sprayman controller
module.exports.sprayman=async(req,res)=>{
    await sprayman.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/sprayman/sprayman', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/sprayman/sprayman', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.spraymanYear=async(req,res)=>{
    await sprayman.findAll({
        where: {year: req.body.year,batch: req.body.batch}
    })
    .then(data => {
        res.render('center/sprayman/spraymanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/sprayman/spraymanYear', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })

};

module.exports.spraymanForm=async(req,res)=>{
    res.render('center/sprayman/spraymanForm', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.spraymanFormPost=async(req,res)=>{
    var name= req.body.name;
    var father= req.body.father;
    var subject= req.body.subject;
    var date= req.body.date;
    var phone= req.body.phone;
    var nid= req.body.nid;
    var kname= req.body.kname;
    var kpodobi= req.body.kpodobi;
    var kmobile= req.body.kmobile;
    var batch= req.body.batch;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await sprayman.create({
        name: name,
        father:father,
        subject:subject,
        date:date,
        phone:phone,
        nid:nid,
        kname:kname,
        kpodobi:kpodobi,
        kmobile:kmobile,
        batch:batch,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/sprayman');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfgeneratePdf = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//sprayman controller end

//apa controller
module.exports.apa=async(req,res)=>{
    console.log("Centerdashboard",res.locals.type);
    await apa.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/apa/apa', { title: 'এপিএ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/apa/apa', { title: 'এপিএ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.apaYear=async(req,res)=>{
    await apa.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/apa/apaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/apa/apaYear', { title: 'এপিএ',success:'', records: err });
    })

};

module.exports.apaForm=async(req,res)=>{
    res.render('center/apa/apaForm', { title: 'এপিএ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.apaFormPost=async(req,res)=>{
    var uddessho= req.body.uddessho;
    var maan= req.body.maan;
    var work= req.body.work;
    var shuchok= req.body.shuchok;
    var ekok= req.body.ekok;
    var shuchokMaan= req.body.shuchokMaan;
    var achievement1= req.body.achievement1;
    var achievement2= req.body.achievement2;
    var best= req.body.best;
    var otiUttam= req.body.otiUttam;
    var uttam= req.body.uttam;
    var cholti= req.body.cholti;
    var below= req.body.below;
    var firstThree= req.body.firstThree;
    var secondThree= req.body.secondThree;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await apa.create({
        uddessho: uddessho,
        maan:maan,
        work:work,
        shuchok: shuchok,
        ekok:ekok,
        shuchokMaan:shuchokMaan,
        achievement1: achievement1,
        achievement2:achievement2,
        best:best,
        otiUttam: otiUttam,
        uttam:uttam,
        cholti:cholti,
        below: below,
        firstThree:firstThree,
        secondThree:secondThree,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/apa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfsprayman = async (req, res) => {
    try {
    var data= await sprayman.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/sprayman", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//apa controller end


//buildingDevelopment controller

module.exports.buildingDevelopment=async(req,res)=>{
    await buildingDevelopment.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/buildingDevelopment/buildingDevelopment', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/buildingDevelopment/buildingDevelopment', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.buildingDevelopmentYear=async(req,res)=>{
    await buildingDevelopment.findAll({
        where: {year: req.body.year,center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/buildingDevelopment/buildingDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/buildingDevelopment/buildingDevelopmentYear', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })

};

module.exports.buildingDevelopmentForm=async(req,res)=>{
    res.render('center/buildingDevelopment/buildingDevelopmentForm', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.buildingDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await buildingDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/buildingDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfbuildingDevelopment = async (req, res) => {
    try {
    var data= await buildingDevelopment.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/buildingDevelopment", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//buildingDevelopment controller end

//guardDevelopment controller
module.exports.guardDevelopment=async(req,res)=>{
    await guardDevelopment.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/guardDevelopment/guardDevelopment', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/guardDevelopment/guardDevelopment', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.guardDevelopmentYear=async(req,res)=>{
    await guardDevelopment.findAll({
        where: {year: req.body.year,center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/guardDevelopment/guardDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/guardDevelopment/guardDevelopmentYear', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })

};

module.exports.guardDevelopmentForm=async(req,res)=>{
    res.render('center/guardDevelopment/guardDevelopmentForm', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.guardDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await guardDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/guardDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//guardDevelopment controller end

//landDevelopment controller
module.exports.landDevelopment=async(req,res)=>{
    await landDevelopment.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/landDevelopment/landDevelopment', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/landDevelopment/landDevelopment', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.landDevelopmentYear=async(req,res)=>{
    await landDevelopment.findAll({
        where: {year: req.body.year,center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/landDevelopment/landDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/landDevelopment/landDevelopmentYear', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: err });
    })

};

module.exports.landDevelopmentForm=async(req,res)=>{
    res.render('center/landDevelopment/landDevelopmentForm', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.landDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await landDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/landDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdflandDevelopment = async (req, res) => {
    try {
    var data= await landDevelopment.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/landDevelopment", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//landDevelopment controller end

//seedDevelopment controller
module.exports.seedDevelopment=async(req,res)=>{
    await seedDevelopment.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/seedDevelopment/seedDevelopment', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/seedDevelopment/seedDevelopment', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.seedDevelopmentYear=async(req,res)=>{
    await seedDevelopment.findAll({
        where: {year: req.body.year,center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/seedDevelopment/seedDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/seedDevelopment/seedDevelopmentYear', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })

};

module.exports.seedDevelopmentForm=async(req,res)=>{
    res.render('center/seedDevelopment/seedDevelopmentForm', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await seedDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/seedDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//seedDevelopment controller end

//wallDevelopment controller
module.exports.wallDevelopment=async(req,res)=>{
    await wallDevelopment.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/wallDevelopment/wallDevelopment', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/wallDevelopment/wallDevelopment', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.wallDevelopmentYear=async(req,res)=>{
    await wallDevelopment.findAll({
        where: {year: req.body.year,center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/wallDevelopment/wallDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/wallDevelopment/wallDevelopmentYear', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })

};

module.exports.wallDevelopmentForm=async(req,res)=>{
    res.render('center/wallDevelopment/wallDevelopmentForm', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.wallDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await wallDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/wallDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfwallDevelopment = async (req, res) => {
    try {
    var data= await wallDevelopment.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/wallDevelopment", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//wallDevelopment controller end

//prodorshoni controller
module.exports.prodorshoni=async(req,res)=>{
    console.log("Centerdashboard",res.locals.type);
    await prodorshoni.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/prodorshoni/prodorshoni', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/prodorshoni/prodorshoni', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',success:'', records: err });
    })
     
    //  records:result

};

module.exports.prodorshoniYear=async(req,res)=>{
    await prodorshoni.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/prodorshoni/prodorshoniTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/prodorshoni/prodorshoniYear', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',success:'', records: err });
    })

};

module.exports.prodorshoniForm=async(req,res)=>{
    res.render('center/prodorshoni/prodorshoniForm', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.prodorshoniFormPost=async(req,res)=>{
    var ortho= req.body.ortho;
    var type= req.body.type;
    var date= req.body.date;
    var fol= req.body.fol;
    var jomi= req.body.jomi;
    var farmer= req.body.farmer;
    var mobile= req.body.mobile;
    var present= req.body.present;
    var saao= req.body.saao;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await prodorshoni.create({
        ortho: ortho,
        type:type,
        date:date,
        fol: fol,
        jomi:jomi,
        farmer:farmer,
        mobile: mobile,
        present:present,
        saao:saao,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/prodorshoni');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//prodorshoni controller end

//infoChp controller
module.exports.infoChp=async(req,res)=>{
    await infoChp.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/infoChp/infoChp', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/infoChp/infoChp', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })
     
    //  records:result

};

module.exports.infoChpYear=async(req,res)=>{
    await infoChp.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/infoChp/infoChpTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/infoChp/infoChpYear', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })

};

module.exports.infoChpForm=async(req,res)=>{
    res.render('center/infoChp/infoChpForm', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.infoChpFormPost=async(req,res)=>{
    var name= req.body.name;
    var date= req.body.date;
    var prodorshoni= req.body.prodorshoni;
    var bagan= req.body.bagan;
    var proBagan= req.body.proBagan;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await infoChp.create({
        name: name,
        date:date,
        prodorshoni:prodorshoni,
        bagan: bagan,
        proBagan:proBagan,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/infoChp');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//infoChp controller end

//infoWorker controller
module.exports.infoWorker=async(req,res)=>{
    await infoWorker.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/infoWorker/infoWorker', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('center/infoWorker/infoWorker', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })
     
    //  records:result

};

module.exports.infoWorkerYear=async(req,res)=>{
    await infoWorker.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/infoWorker/infoWorkerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('center/infoWorker/infoWorkerYear', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })

};

module.exports.infoWorkerForm=async(req,res)=>{
    res.render('center/infoWorker/infoWorkerForm', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.infoWorkerFormPost=async(req,res)=>{
    var name= req.body.name;
    var adress= req.body.adress;
    var mobile= req.body.mobile;
    var niyog= req.body.niyog;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await infoWorker.create({
        name: name,
        adress:adress,
        mobile:mobile,
        niyog: niyog,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/infoWorker');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//infoWorker controller end

//development controller
module.exports.motivation=async(req,res)=>{
    await motivation.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/motivation/motivation', { title: 'মোটিভেশনের মাধ্যমে বাগান স্থাপনকারী চাষীদের তালিকা',success:'', records: data });
    })
    .catch(err => {
        console.log(err);
    })
     
    //  records:result

};

module.exports.motivationYear=async(req,res)=>{
    await motivation.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err); 
    })

};

module.exports.motivationForm=async(req,res)=>{
    res.render('center/motivation/motivationForm', { title: 'মোটিভেশনের মাধ্যমে বাগান স্থাপনকারী চাষীদের তালিকার ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.motivationFormPost=async(req,res)=>{
    var farmer= req.body.farmer;
    var address= req.body.address;
    var mobile= req.body.mobile;
    var bagan= req.body.bagan;
    var jomi= req.body.jomi;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await motivation.create({
        farmer: farmer,
        address:address,
        mobile:mobile,
        bagan:bagan,
        jomi: jomi,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfchak1 = async (req, res) => {
    try {
    var data= await chp.findAll({
        where: {  center_id: req.session.user_id },
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/chp/chp/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//motivation controller end

//development controller
module.exports.development=async(req,res)=>{
    await development.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('center/development/development', { title: 'অন্যান্য উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log(err);
    })
     
    //  records:result

};

module.exports.developmentYear=async(req,res)=>{
    await development.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('center/development/developmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.developmentForm=async(req,res)=>{
    res.render('center/development/developmentForm', { title: 'অন্যান্য উন্নয়নমূলক কাজের প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.developmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await development.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/center/development');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

module.exports.generatePdfdevelopment = async (req, res) => {
    try {
    var data= await development.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
      })
        ejs.renderFile(
            path.join(__dirname, "../views/center/development/development/", "pdf.ejs"),
            { records: data,dirname: __dirname },
            (err, data) => {
              if (err) {
                console.log("error", err);
                res.send(err);
              } else {
                var assesPath = path.join(__dirname, "../public/");
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), "/");
  
                var options = {
                  height: "11.25in",
                  width: "18.5in",
                  header: {
                    height: "20mm",
                  },
                  footer: {
                    height: "20mm",
                  },
                  base: "file:///" + assesPath,
                };
                res.json({ html: data });
              }
            }
        )
      
      
    } catch (e) {
      console.log(e);
    }
  
  };
//motivation controller end