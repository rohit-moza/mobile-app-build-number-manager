const mongoose = require('mongoose');
const config = require('../config/database');

const AppBuildsSchema = mongoose.Schema({
  bundle_id: {
    type: String,
    required: true
  },
  build_number: {
    type: Number,
    required: true
  }
});

const AppBuild = module.exports = mongoose.model('AppBuild', AppBuildsSchema);

module.exports.getAppBuildByBundleId = function(bundleId, cb){
  AppBuild.findOne({bundle_id: bundleId}, cb);
};

module.exports.addAppBuild = function(newAppBuild, cb){
  newAppBuild.save(cb);
};

module.exports.updateAppBuildNumber = function(AppBuild, newBuildNumber, cb){
  AppBuild.build_number = newBuildNumber;
  AppBuild.save(cb);
};