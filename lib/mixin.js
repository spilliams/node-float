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

  return url+"?"+qs.stringify(options);
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
  logTimeStamp: function(d) {
    d = d || new Date();
    // YYYY-MM-DD HH:M:SS.mmmm
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();
  },
  apiPath: "/api/v1"
};
