const mongoose = require('mongoose');
const config = require('../config/database');

const AppBuildsSchema = mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  app_name: {
    type: String,
    required: true
  },
  build_number: {
    type: Number,
    required: true
  }
});

const AppBuild = module.exports = mongoose.model('AppBuild', AppBuildsSchema);

module.exports.getAppBuildById = function(id, cb){
  AppBuild.findById(id, cb);
};

module.exports.getAppBuildByAppName = function(app_name, cb){
const query = {app_name: app_name};
  AppBuild.findById(query, cb);
};

module.exports.addAppBuild = function(newAppBuild, cb){
  newAppBuild.save(cb);
};