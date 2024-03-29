const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {sprayman,spraymanYear,spraymanForm,spraymanFormPost,female,femaleYear,femaleForm,femaleFormPost,
    gardener,gardenerYear,gardenerForm,gardenerFormPost,nurseryman,nurserymanYear,nurserymanForm,nurserymanFormPost,
    development,developmentYear,developmentForm,developmentFormPost,motivation,motivationYear,motivationForm,motivationFormPost,
    infoWorker,infoWorkerYear,infoWorkerForm,infoWorkerFormPost,infoChp,infoChpYear,infoChpForm,infoChpFormPost,
    prodorshoni,prodorshoniYear,prodorshoniForm,prodorshoniFormPost,wallDevelopment,wallDevelopmentYear,wallDevelopmentForm,wallDevelopmentFormPost,
    seedDevelopment,seedDevelopmentYear,seedDevelopmentForm,seedDevelopmentFormPost,landDevelopment,landDevelopmentYear,landDevelopmentForm,landDevelopmentFormPost,
    guardDevelopment,guardDevelopmentYear,guardDevelopmentForm,guardDevelopmentFormPost,center,centerEdit,centerEditPost,centerDelete,
    buildingDevelopment,buildingDevelopmentYear,buildingDevelopmentForm,buildingDevelopmentFormPost,apa,apaYear,apaForm,apaFormPost,centerPasswordEdit,centerPasswordEditPost,
    farmer,farmerYear,farmerForm,farmerFormPost,kormokorta,kormokortaYear,kormokortaForm,kormokortaFormPost,saao,saaoYear,saaoForm,saaoFormPost,
    uddan,uddanYear,uddanForm,uddanFormPost,charaKolomFixed,allCenterInfo,centersignup,centersignuppost,allcenter,centerlogin,centerloginpost,centerDashboard,
    chp,chpYear,chpForm,chpFormPost,generatePdfchp,generatePdffarmer,generatePdfnurseryman,generatePdfsprayman,generatePdfkormokorta,generatePdfsaao,generatePdfgardener,generatePdffemale,generatePdfuddan,generatePdflandDevelopment,generatePdfbuildingDevelopment,generatePdfwallDevelopment} = require('../controllers/center.controller');

router.get('/',allcenter);
router.get('/allCenterInfo',allCenterInfo);
router.get('/charaKolomFixed',charaKolomFixed);
router.get('/login',centerlogin);
router.post('/logins',centerloginpost);
router.get('/dashboard',centerDashboard);

router.get('/signup',centersignup);
router.post('/signups',centersignuppost);

router.get('/center',center);
router.get('/centerEdit/:id',centerEdit);
router.post('/centerEditPost/:id',centerEditPost);
router.get('/centerDelete/:id',centerDelete);
router.get('/centerPasswordEdit/:id',centerPasswordEdit);
router.post('/centerPasswordEditPost/:id',centerPasswordEditPost);

router.get('/chp',chp);
router.post('/chpYear',chpYear);
router.get('/chpForm',chpForm);
router.post('/chpForms',chpFormPost);
router.post('/generatePdfchp',generatePdfchp);

router.get('/farmer',farmer);
router.post('/farmerYear',farmerYear);
router.get('/farmerForm',farmerForm);
router.post('/farmerForms',farmerFormPost);
router.post('/generatePdffarmer',generatePdffarmer);

router.get('/kormokorta',kormokorta);
router.post('/kormokortaYear',kormokortaYear);
router.get('/kormokortaForm',kormokortaForm);
router.post('/kormokortaForms',kormokortaFormPost);
router.post('/generatePdfkormokorta',generatePdfkormokorta);


router.get('/apa',apa);
router.post('/apaYear',apaYear);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);

router.get('/saao',saao);
router.post('/saaoYear',saaoYear);
router.get('/saaoForm',saaoForm);
router.post('/saaoForms',saaoFormPost);
router.post('/generatePdfsaao',generatePdfsaao);

router.get('/uddan',uddan);
router.post('/uddanYear',uddanYear);
router.get('/uddanForm',uddanForm);
router.post('/uddanForms',uddanFormPost);
router.post('/generatePdfuddan',generatePdfuddan);

router.get('/buildingDevelopment',buildingDevelopment);
router.post('/buildingDevelopmentYear',buildingDevelopmentYear);
router.get('/buildingDevelopmentForm',buildingDevelopmentForm);
router.post('/buildingDevelopmentForms',buildingDevelopmentFormPost);
router.post('/generatePdfbuildingDevelopment',generatePdfbuildingDevelopment);

router.get('/guardDevelopment',guardDevelopment);
router.post('/guardDevelopmentYear',guardDevelopmentYear);
router.get('/guardDevelopmentForm',guardDevelopmentForm);
router.post('/guardDevelopmentForms',guardDevelopmentFormPost);

router.get('/landDevelopment',landDevelopment);
router.post('/landDevelopmentYear',landDevelopmentYear);
router.get('/landDevelopmentForm',landDevelopmentForm);
router.post('/landDevelopmentForms',landDevelopmentFormPost);
router.post('/generatePdfuddanlandDevelopment',generatePdflandDevelopment);

router.get('/seedDevelopment',seedDevelopment);
router.post('/seedDevelopmentYear',seedDevelopmentYear);
router.get('/seedDevelopmentForm',seedDevelopmentForm);
router.post('/seedDevelopmentForms',seedDevelopmentFormPost);

router.get('/wallDevelopment',wallDevelopment);
router.post('/wallDevelopmentYear',wallDevelopmentYear);
router.get('/wallDevelopmentForm',wallDevelopmentForm);
router.post('/wallDevelopmentForms',wallDevelopmentFormPost);
router.post('/generatePdfwallDevelopment',generatePdfwallDevelopment);

router.get('/prodorshoni',prodorshoni);
router.post('/prodorshoniYear',prodorshoniYear);
router.get('/prodorshoniForm',prodorshoniForm);
router.post('/prodorshoniForms',prodorshoniFormPost);

router.get('/infoChp',infoChp);
router.post('/infoChpYear',infoChpYear);
router.get('/infoChpForm',infoChpForm);
router.post('/infoChpForms',infoChpFormPost);

router.get('/infoWorker',infoWorker);
router.post('/infoWorkerYear',infoWorkerYear);
router.get('/infoWorkerForm',infoWorkerForm);
router.post('/infoWorkerForms',infoWorkerFormPost);

router.get('/motivation',motivation);
router.post('/motivationYear',motivationYear);
router.get('/motivationForm',motivationForm);
router.post('/motivationForms',motivationFormPost);

router.get('/development',development);
router.post('/developmentYear',developmentYear);
router.get('/developmentForm',developmentForm);
router.post('/developmentForms',developmentFormPost);

router.get('/female',female);
router.post('/femaleYear',femaleYear);
router.get('/femaleForm',femaleForm);
router.post('/femaleForms',femaleFormPost);
router.post('/generatePdffemale',generatePdffemale);

router.get('/gardener',gardener);
router.post('/gardenerYear',gardenerYear);
router.get('/gardenerForm',gardenerForm);
router.post('/gardenerForms',gardenerFormPost);
router.post('/generatePdfgardener',generatePdfgardener);

router.get('/nurseryman',nurseryman);
router.post('/nurserymanYear',nurserymanYear);
router.get('/nurserymanForm',nurserymanForm);
router.post('/nurserymanForms',nurserymanFormPost);
router.post('/generatePdfnurseryman',generatePdfnurseryman);

router.get('/sprayman',sprayman);
router.post('/spraymanYear',spraymanYear);
router.get('/spraymanForm',spraymanForm);
router.post('/spraymanForms',spraymanFormPost);
router.post('/generatePdfsprayman',generatePdfsprayman);



module.exports = router;