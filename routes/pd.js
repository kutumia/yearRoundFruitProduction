const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdlogin,pdloginpost,pdDashboard,pdsignup,pdsignuppost,center,centerYear,centerEdit,centerEditPost,centerDelete,centerPasswordEdit,centerPasswordEditPost,chp,chpFilter,farmer,farmerFilter,kormokorta,kormokortaFilter,expense,expenseFilter,expenseForm,expenseFormPost,
    apa,apaFilter,apaForm,apaFormPost,saao,saaoFilter,uddan,uddanFilter,buildingDevelopment,buildingDevelopmentFilter,buildingDevelopmentForm,buildingDevelopmentFormPost
    ,guardDevelopment,guardDevelopmentFilter,guardDevelopmentForm,guardDevelopmentFormPost,
    landDevelopment,landDevelopmentFilter,landDevelopmentForm,landDevelopmentFormPost,
    seedDevelopment,seedDevelopmentFilter,seedDevelopmentForm,seedDevelopmentFormPost,
    wallDevelopment,wallDevelopmentFilter,wallDevelopmentForm,wallDevelopmentFormPost,
    prodorshoni,prodorshoniFilter,prodorshoniForm,prodorshoniFormPost,
    infoChp,infoChpFilter,infoChpForm,infoChpFormPost,infoWorker,infoWorkerFilter,infoWorkerForm,infoWorkerFormPost,
    motivation,motivationFilter,motivationForm,motivationFormPost,development,developmentFilter,developmentForm,developmentFormPost,
    female,femaleFilter,gardener,gardenerFilter,
    nurseryman,nurserymanFilter,sprayman,spraymanFilter} = require('../controllers/pd.controller');



router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/center',center);
router.post('/centerYear',centerYear);
router.get('/centerEdit/:id',centerEdit);
router.post('/centerEditPost/:id',centerEditPost);
router.get('/centerDelete/:id',centerDelete);
router.get('/centerPasswordEdit/:id',centerPasswordEdit);
router.post('/centerPasswordEditPost/:id',centerPasswordEditPost);

router.get('/chp',chp);
router.post('/chpFilter',chpFilter);

router.get('/farmer',farmer);
router.post('/farmerFilter',farmerFilter);

router.get('/kormokorta',kormokorta);
router.post('/kormokortaFilter',kormokortaFilter);

router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);
router.get('/expenseForm',expenseForm);
router.post('/expenseForms',expenseFormPost);

router.get('/apa',apa);
router.post('/apaFilter',apaFilter);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);

router.get('/saao',saao);
router.post('/saaoFilter',saaoFilter);

router.get('/uddan',uddan);
router.post('/uddanFilter',uddanFilter);

router.get('/buildingDevelopment',buildingDevelopment);
router.post('/buildingDevelopmentFilter',buildingDevelopmentFilter);
router.get('/buildingDevelopmentForm',buildingDevelopmentForm);
router.post('/buildingDevelopmentForms',buildingDevelopmentFormPost);

router.get('/guardDevelopment',guardDevelopment);
router.post('/guardDevelopmentFilter',guardDevelopmentFilter);
router.get('/guardDevelopmentForm',guardDevelopmentForm);
router.post('/guardDevelopmentForms',guardDevelopmentFormPost);

router.get('/landDevelopment',landDevelopment);
router.post('/landDevelopmentFilter',landDevelopmentFilter);
router.get('/landDevelopmentForm',landDevelopmentForm);
router.post('/landDevelopmentForms',landDevelopmentFormPost);

router.get('/seedDevelopment',seedDevelopment);
router.post('/seedDevelopmentFilter',seedDevelopmentFilter);
router.get('/seedDevelopmentForm',seedDevelopmentForm);
router.post('/seedDevelopmentForms',seedDevelopmentFormPost);

router.get('/wallDevelopment',wallDevelopment);
router.post('/wallDevelopmentFilter',wallDevelopmentFilter);
router.get('/wallDevelopmentForm',wallDevelopmentForm);
router.post('/wallDevelopmentForms',wallDevelopmentFormPost);

router.get('/prodorshoni',prodorshoni);
router.post('/prodorshoniFilter',prodorshoniFilter);
router.get('/prodorshoniForm',prodorshoniForm);
router.post('/prodorshoniForms',prodorshoniFormPost);

router.get('/infoChp',infoChp);
router.post('/infoChpFilter',infoChpFilter);
router.get('/infoChpForm',infoChpForm);
router.post('/infoChpForms',infoChpFormPost);

router.get('/infoWorker',infoWorker);
router.post('/infoWorkerFilter',infoWorkerFilter);
router.get('/infoWorkerForm',infoWorkerForm);
router.post('/infoWorkerForms',infoWorkerFormPost);

router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);
router.get('/motivationForm',motivationForm);
router.post('/motivationForms',motivationFormPost);

router.get('/development',development);
router.post('/developmentFilter',developmentFilter);
router.get('/developmentForm',developmentForm);
router.post('/developmentForms',developmentFormPost);

router.get('/female',female);
router.post('/femaleFilter',femaleFilter);

router.get('/gardener',gardener);
router.post('/gardenerFilter',gardenerFilter);

router.get('/nurseryman',nurseryman);
router.post('/nurserymanFilter',nurserymanFilter);

router.get('/sprayman',sprayman);
router.post('/spraymanFilter',spraymanFilter);



module.exports = router;