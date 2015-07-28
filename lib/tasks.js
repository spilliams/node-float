var Tasks, _isUndefined = require('../mixin');
var global = require('./global');

module.exports = Tasks = function (api) {
  this.api = api;
  this.client = api.client;
};

Tasks.prototype.list = function (options, callback) {
  var url = global.apiPath + "/tasks";
  if (!_isUndefined(options, 'id')) {
    url = url+"?people_id="+options.id;
  }
  this.client.get(url, {}, callback);
}
