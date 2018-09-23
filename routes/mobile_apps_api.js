const express = require('express');
const router = express.Router();

const AppBuild = require('../models/app-builds');

sendBuildCreatedResponse = (res, newAppBuild) => res.json({success: 200, msg: "New AppBuild Created", app_build: newAppBuild});
sendBuildUpdatedResponse = (res, updatedAppBuildNumber) => res.json({success: 200, msg: "AppBuild Updated", build_number:  updatedAppBuildNumber});
sendUpdateCreateFailedResponse = (res, err) => res.json({success: 400, err: err});
sendUpdateAppBuildFailedResponse = (res) => res.json({success: 400, err: "New Build number < Exisiting Build number. Update Failed"});
sendAppFoundResponse = (res, appBuildNumber) => res.json({success: 200, build_number: appBuildNumber});
sendAppNotFoundResponse = (res) => res.json({success: 400, err: "Bunlde id not found"});

constructAppBuildObject = (bundle_id, buildNumber=0) => new AppBuild({ bundle_id: bundle_id, build_number: buildNumber})

addAppBuild = (newAppBuild, res) => {
  AppBuild.addAppBuild(newAppBuild, (err, newAppBuild) => {
    if(err) {
      sendUpdateCreateFailedResponse(res, err);
    } else {
      sendBuildCreatedResponse(res, newAppBuild)
    }
  });
}

newAppBuildCreate = (reqBundleId, res) => {
  let newAppBuild = constructAppBuildObject(reqBundleId)
  addAppBuild(newAppBuild, res);
}

updateAppBuild = (existingAppBuild, newBuildNumber, res) => {

  AppBuild.updateAppBuildNumber(existingAppBuild, newBuildNumber, (err, updatedAppBuild) => {
    if(err) {
      sendUpdateCreateFailedResponse(res, err);
    } else {
      sendBuildUpdatedResponse(res, updatedAppBuild.build_number);
    }
  });

}


router.get('/read', (req, res) => {

  let bundleId = req.query.bundle_id;
    console.log(bundleId);

  AppBuild.getAppBuildByBundleId(bundleId, (err, foundAppBuild) => {
    if (foundAppBuild) {
      sendAppFoundResponse(res, foundAppBuild.build_number);
    } else {
      sendAppNotFoundResponse(res);
    }
  });

});

router.post('/set', (req, res) => {
  let reqBundleId = req.body.bundle_id;
  let newBuildNumber = req.body.build_number;

  AppBuild.getAppBuildByBundleId(reqBundleId, (err, AppBuildFound) => {
    if (!AppBuildFound) {
      newAppBuildCreate(reqBundleId, res);
    } else {
      if (newBuildNumber > AppBuildFound.build_number){
        updateAppBuild(AppBuildFound, newBuildNumber, res);
      } else {
        sendUpdateAppBuildFailedResponse(res);
      }
    }
  })

});

router.post('/bump', (req, res) => {
  let reqBundleId = req.body.bundle_id;

   AppBuild.getAppBuildByBundleId(reqBundleId, (err, AppBuildFound) => {
    if (!AppBuildFound) {
      newAppBuildCreate(reqBundleId, res);
    } else {
      let newBuildNumber = AppBuildFound.build_number + 1;
      updateAppBuild(AppBuildFound, newBuildNumber, res);
    }
  })

});

module.exports = router;