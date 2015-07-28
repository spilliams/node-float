var isUndefined = function(obj) {
  var i;

  for (i = arguments.length - 1; i >= 1; i--) {
    if (!obj.hasOwnProperty(arguments[i])) {
        return true;
    }
  };
  return false;
};
var commonParams = function(url, options) {
  var qs = require('querystring');
  // options going into url will are whitelisted
  var wl = ["active", "people_id", "name", "job_title", "email", "department_id", "skills", "start_day", "weeks", "project_id", "start_date", "end_date", "hours_pd"];
  var params = {};
  for (var i=0; i<wl.length; i++) {
    if (!isUndefined(options, wl[i])) {
      params[wl[i]] = options[wl[i]];
    }
  }
  return url+"?"+qs.stringify(params);
}

module.exports = {
  isUndefined: isUndefined,
  commonParams: commonParams,
  validate: {
    existence: function(options, param) {
      if (isUndefined(options, param)) {
        throw new Error('Provide a value for key '+param+' in the options object');
      }
    }
  },
  apiPath: "/api/v1"
};
