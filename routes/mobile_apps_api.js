const express = require('express');
const router = express.Router();

const AppBuild = require('../models/app-builds');

sendAppExistsResponse = (res) => res.json({success: 200, msg: "Already exists updating"});
sendAppFoundResponse = (res, AppBuild) => res.json({success: 200, app_build: AppBuild})
sendAppNotFoundResponse = (res) => res.json({success: 400, msg: 'build id not found'})

constructAppBuildObject = (bundle_id) => new AppBuild({ bundle_id: bundle_id, build_number:0})

addAppBuild = (newAppBuild, res) => {
  AppBuild.addAppBuild(newAppBuild, (err, AppBuild) => {
    if(err) {
      res.json({success: 400, err: err});
    } else {
      res.json({success: 200, msg: 'New AppBuild Created', app_build: AppBuild });
    }
  });
}

updateAppBuild = (AppBuild) => {

}


router.get('/read', (req, res, next) => {
    // Example: ./api/read?bundle_id=com.sagomini.HomeworkChallenge
  let bundleId = req.query.bundle_id;
  // console.log(req.query.bundle_id);
  AppBuild.getAppBuildByBundleId(bundleId, (err, AppBuild) => {

    if (AppBuild) {
      sendAppFoundResponse(res, AppBuild)
    } else {
      sendAppNotFoundResponse(res);
    }
     
  });
});

router.post('/set', (req, res, next) => {

  let reqBundleId = req.body.bundle_id;
  let buildNumber = req.body.build_number;
  AppBuild.getAppBuildByBundleId(reqBundleId, (err, appBuildFound) => {
    if (!appBuildFound) {
      let newAppBuild = constructAppBuildObject(reqBundleId)
      addAppBuild(newAppBuild, res);
    } else {
      sendAppExistsResponse(res);
    }
  })
  // if bundle_id does not exist.●create and init build_number = 0;■

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