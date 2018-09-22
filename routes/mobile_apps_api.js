const express = require('express');
const router = express.Router();

const AppBuild = require('../models/app-builds');

router.get('/read', (req, res, next) => {
  res.json('READ');
});

router.post('/set', (req, res, next) => {
  console.log("REQ BODY", req.body);
  let newAppBuild = new AppBuild({
    company_name: req.body.company_name,
    app_name: req.body.app_name,
    build_number: req.body.build_number
  });
  console.log(newAppBuild);
  AppBuild.addAppBuild(newAppBuild, (err, app_name) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register app build' + err});
    } else {
      res.json({success: true, msg: 'new AppBuild Created'});
    }
  });
//   params: ■bundle_id(string)■ new_build_number(int)○ biz logic■
// if bundle_id does not exist.●create and init build_number = 0;■
// If new_build_number > existing_build_number● existing_build_number = new_build_number○
// return :■success: 200■
// else :4 xx
});

router.post('/bump', (req, res, next) => {
  res.json('BUMP');
});

module.exports = router;