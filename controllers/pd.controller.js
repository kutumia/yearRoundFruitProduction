const db=require('../models');
const pd = db.pd;
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
        res.render('allCenterInfo', { title: 'সেন্টারের লগিন তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('allCenterInfo', { title: 'সেন্টারের লগিন তথ্য',success:'', records: err });
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

module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals.type);
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'Year Round Fruit Production Central Management Software',msg:'Please provide a username and password' });
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

module.exports.pdDashboard = async(req,res) => {
    console.log("PDdashboard",res.locals.type,);
    res.render('pd/dashboard', { title: 'Year Round Fruit Production Central Management Software',msg:'Welcome' });
};

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'Year Round Fruit Production Central Management Software',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    })
                res.render('pd/signup',{title: 'Year Round Fruit Production Central Management Software',msg:'pd Registered Successfully!'})
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
//signUp controller ends 

//center controller
module.exports.center=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside",data);
        res.render('pd/centerInfo/center', { title: 'সেন্টারের লগিন তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside",err);

    })
     
    //  records:result

};

module.exports.centerYear=async(req,res)=>{
    await center.findAll()
    .then(data => {
        res.render('pd/centerInfo/centerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log("outside",err);

    })

};
module.exports.centerEdit=async(req,res)=>{
    await center.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/centerInfo/centerEdit', { title: 'সেন্টারের লগিন তথ্য ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside",err);

    })
};
module.exports.centerEditPost=async(req,res)=>{
    var uname = req.body.uname;
    var user= req.body.user;

    await center.update({ 
        uname:uname,
        user:user,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/center');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.centerDelete=async(req,res)=>{
    var centerDelete = await center.findByPk(req.params.id);
    try {
        centerDelete.destroy();
        res.redirect("/pd/center");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
module.exports.centerPasswordEdit=async(req,res)=>{
    await center.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/centerInfo/centerPasswordEdit', { title: 'সেন্টারের লগিন তথ্য ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside",err);

    })
};
module.exports.centerPasswordEditPost=async(req,res)=>{
    var password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    await center.update({ 
        password:hashedPassword
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        console.log("data",data);
        res.redirect('/pd/center');
    }).catch(err => {
        console.log(err);
    });
};
//adminInfo controller

//chp controller
module.exports.chp=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/chp/chp', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/chp/chp', { title: 'সিএইচপি/কমিউনিটি হরটিকালচার প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.chpFilter=async(req,res)=>{
    await chp.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/chp/chpTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};
//chp controller end

//farmer controller
module.exports.farmer=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/farmer/farmer', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/farmer/farmer', { title: 'প্রদর্শনী কৃষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.farmerFilter=async(req,res)=>{
    await farmer.findAll({
        where: {year: req.body.year,center_id : req.body.center, batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/farmer/farmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

//farmer controller end

//kormokorta controller
module.exports.kormokorta=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/kormokorta/kormokorta', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/kormokorta/kormokorta', { title: 'কর্মকর্তা ও প্রশিক্ষক প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.kormokortaFilter=async(req,res)=>{
    await kormokorta.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/kormokorta/kormokortaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

//kormokorta controller end

//saao controller
module.exports.saao=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/saao/saao', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/saao/saao', { title: 'এসএএও/এসএএইচও প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.saaoFilter=async(req,res)=>{
    await saao.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/saao/saaoTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

//saao controller end

//uddan controller
module.exports.uddan=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/uddan/uddan', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/uddan/uddan', { title: 'উদ্যান বিষয়ক চাষী প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.uddanFilter=async(req,res)=>{
    await uddan.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/uddan/uddanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};


//uddan controller end

//female controller
module.exports.female=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/female/female', { title: 'মহিলা উদ্যোক্তা প্রশিক্ষণ',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/female/female', { title: 'মহিলা উদ্যোক্তা প্রশিক্ষণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.femaleFilter=async(req,res)=>{
    await female.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/female/femaleTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

//female controller end

//gardener controller
module.exports.gardener=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/gardener/gardener', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/gardener/gardener', { title: 'গার্ডেনার/মালি প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.gardenerFilter=async(req,res)=>{
    await gardener.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/gardener/gardenerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

//kormokorta controller end

//nurseryman controller
module.exports.nurseryman=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/nurseryman/nurseryman', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/nurseryman/nurseryman', { title: 'নার্সারিম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.nurserymanFilter=async(req,res)=>{
    await nurseryman.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/nurseryman/nurserymanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

//nurseryman controller end

//sprayman controller
module.exports.sprayman=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/sprayman/sprayman', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/sprayman/sprayman', { title: 'স্প্রেম্যান প্রশিক্ষণ প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.spraymanFilter=async(req,res)=>{
    await sprayman.findAll({
        where: {year: req.body.year,center_id : req.body.center,batch:req.body.batch}
    })
    .then(data => {
        res.render('pd/sprayman/spraymanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

//sprayman controller end

//apa controller
module.exports.apa=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/apa/apa', { title: 'এপিএ',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/apa/apa', { title: 'এপিএ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.apaFilter=async(req,res)=>{
    await apa.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/apa/apaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.apaForm=async(req,res)=>{
    res.render('pd/apa/apaForm', { title: 'এপিএ',msg:'' ,success:'',user_id: req.session.user_id});
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
    var Filter =req.body.Filter;
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
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/apa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//apa controller end

//expense controller
module.exports.expense=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/expense/expense', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/expense/expense', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',success:'', records: err });
    })
     
    //  records:result

};

module.exports.expenseFilter=async(req,res)=>{
    await expense.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/expense/expenseTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.expenseForm=async(req,res)=>{
    res.render('pd/expense/expenseForm', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.expenseFormPost=async(req,res)=>{
    var code= req.body.code;
    var khat= req.body.khat;
    var boraddo= req.body.boraddo;
    var july1= req.body.july1;
    var august1= req.body.august1;
    var sept1= req.body.sept1;
    var oct1= req.body.oct1;
    var nov1= req.body.nov1;
    var dec1= req.body.dec1;
    var jan2= req.body.jan2;
    var feb2= req.body.feb2;
    var march2= req.body.march2;
    var apr2= req.body.apr2;
    var may2= req.body.may2;
    var june2= req.body.june2;
    var total= req.body.total;
    var baki= req.body.baki;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await expense.create({
        code: code,
        khat:khat,
        boraddo:boraddo,
        july1:july1,
        august1: august1,
        sept1:sept1,
        oct1:oct1,
        nov1: nov1,
        dec1:dec1,
        jan2:jan2,
        feb2: feb2,
        march2:march2,
        apr2: apr2,
        may2:may2,
        june2:june2,
        total: total,
        baki:baki,
        comment: comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/expense');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//expense controller end

//buildingDevelopment controller

module.exports.buildingDevelopment=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/buildingDevelopment/buildingDevelopment', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/buildingDevelopment/buildingDevelopment', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.buildingDevelopmentFilter=async(req,res)=>{
    await buildingDevelopment.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/buildingDevelopment/buildingDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.buildingDevelopmentForm=async(req,res)=>{
    res.render('pd/buildingDevelopment/buildingDevelopmentForm', { title: 'ভবন নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.buildingDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await buildingDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/buildingDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//buildingDevelopment controller end

//guardDevelopment controller
module.exports.guardDevelopment=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/guardDevelopment/guardDevelopment', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/guardDevelopment/guardDevelopment', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.guardDevelopmentFilter=async(req,res)=>{
    await guardDevelopment.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/guardDevelopment/guardDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.guardDevelopmentForm=async(req,res)=>{
    res.render('pd/guardDevelopment/guardDevelopmentForm', { title: 'গার্ড শেড/নার্সারি নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.guardDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await guardDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/guardDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//guardDevelopment controller end

//landDevelopment controller
module.exports.landDevelopment=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/landDevelopment/landDevelopment', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/landDevelopment/landDevelopment', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.landDevelopmentFilter=async(req,res)=>{
    await landDevelopment.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/landDevelopment/landDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.landDevelopmentForm=async(req,res)=>{
    res.render('pd/landDevelopment/landDevelopmentForm', { title: 'ভূমি উন্নয়নমূলক কাজের প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.landDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await landDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/landDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//landDevelopment controller end

//seedDevelopment controller
module.exports.seedDevelopment=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/seedDevelopment/seedDevelopment', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/seedDevelopment/seedDevelopment', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.seedDevelopmentFilter=async(req,res)=>{
    await seedDevelopment.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/seedDevelopment/seedDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.seedDevelopmentForm=async(req,res)=>{
    res.render('pd/seedDevelopment/seedDevelopmentForm', { title: 'সীডবেড নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await seedDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/seedDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//seedDevelopment controller end

//wallDevelopment controller
module.exports.wallDevelopment=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/wallDevelopment/wallDevelopment', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/wallDevelopment/wallDevelopment', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.wallDevelopmentFilter=async(req,res)=>{
    await wallDevelopment.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/wallDevelopment/wallDevelopmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.wallDevelopmentForm=async(req,res)=>{
    res.render('pd/wallDevelopment/wallDevelopmentForm', { title: 'সীমানা প্রাচীর নির্মাণ বিষয়ক তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.wallDevelopmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await wallDevelopment.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/wallDevelopment');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//wallDevelopment controller end

//prodorshoni controller
module.exports.prodorshoni=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/prodorshoni/prodorshoni', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/prodorshoni/prodorshoni', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',success:'', records: err });
    })
     
    //  records:result

};

module.exports.prodorshoniFilter=async(req,res)=>{
    await prodorshoni.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/prodorshoni/prodorshoniTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.prodorshoniForm=async(req,res)=>{
    res.render('pd/prodorshoni/prodorshoniForm', { title: 'প্রদর্শনী সংক্রান্ত তথ্যাদি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.prodorshoniFormPost=async(req,res)=>{
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
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await prodorshoni.create({
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
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/apa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//prodorshoni controller end

//infoChp controller
module.exports.infoChp=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/infoChp/infoChp', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/infoChp/infoChp', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })
     
    //  records:result

};

module.exports.infoChpFilter=async(req,res)=>{
    await infoChp.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/infoChp/infoChpTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.infoChpForm=async(req,res)=>{
    res.render('pd/infoChp/infoChpForm', { title: 'সেন্টারের সিএইচপি সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.infoChpFormPost=async(req,res)=>{
    var name= req.body.name;
    var date= req.body.date;
    var prodorshoni= req.body.prodorshoni;
    var bagan= req.body.bagan;
    var proBagan= req.body.proBagan;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await infoChp.create({
        name: name,
        date:date,
        prodorshoni:prodorshoni,
        bagan: bagan,
        proBagan:proBagan,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/infoChp');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//infoChp controller end

//infoWorker controller
module.exports.infoWorker=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/infoWorker/infoWorker', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/infoWorker/infoWorker', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',success:'', records: err });
    })
     
    //  records:result

};

module.exports.infoWorkerFilter=async(req,res)=>{
    await infoWorker.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/infoWorker/infoWorkerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.infoWorkerForm=async(req,res)=>{
    res.render('pd/infoWorker/infoWorkerForm', { title: 'সেন্টারের শ্রমিক সংক্রান্ত তথ্য ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.infoWorkerFormPost=async(req,res)=>{
    var name= req.body.name;
    var adress= req.body.adress;
    var mobile= req.body.mobile;
    var niyog= req.body.niyog;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await infoWorker.create({
        name: name,
        adress:adress,
        mobile:mobile,
        niyog: niyog,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/infoWorker');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//infoWorker controller end

//development controller
module.exports.motivation=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/motivation/motivation', { title: 'মোটিভেশনের মাধ্যমে বাগান স্থাপনকারী চাষীদের তালিকার ফর্ম',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/motivation/motivation', { title: 'মোটিভেশনের মাধ্যমে বাগান স্থাপনকারী চাষীদের তালিকার ফর্ম',success:'', records: err });
    })
     
    //  records:result

};

module.exports.motivationFilter=async(req,res)=>{
    await motivation.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.motivationForm=async(req,res)=>{
    res.render('pd/motivation/motivationForm', { title: 'মোটিভেশনের মাধ্যমে বাগান স্থাপনকারী চাষীদের তালিকার ফর্ম',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.motivationFormPost=async(req,res)=>{
    var farmer= req.body.farmer;
    var address= req.body.address;
    var mobile= req.body.mobile;
    var bagan= req.body.bagan;
    var jomi= req.body.jomi;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await motivation.create({
        farmer: farmer,
        address:address,
        mobile:mobile,
        bagan:bagan,
        jomi: jomi,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//motivation controller end

//development controller
module.exports.development=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/development/development', { title: 'অন্যান্য উন্নয়নমূলক কাজের প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/development/development', { title: 'অন্যান্য উন্নয়নমূলক কাজের প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.developmentFilter=async(req,res)=>{
    await development.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/development/developmentTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })


};

module.exports.developmentForm=async(req,res)=>{
    res.render('pd/development/developmentForm', { title: 'অন্যান্য উন্নয়নমূলক কাজের প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.developmentFormPost=async(req,res)=>{
    var kaj= req.body.kaj;
    var poriman= req.body.poriman;
    var ortho= req.body.ortho;
    var present= req.body.present;
    var comment= req.body.comment;
    var Filter =req.body.Filter;
    var user_id =req.body.user_id;

    await development.create({
        kaj: kaj,
        poriman:poriman,
        ortho:ortho,
        present:present,
        comment:comment,
        Filter:Filter,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/development');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//motivation controller end