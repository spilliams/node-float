var mixin = require('./mixin'),
  Generic;

module.exports = Generic = function (api, endpoint) {
  this.api = api;
  this.client = api.client;
  this.endpoint = endpoint;
};

Generic.prototype.list = function (options, callback) {
  var url = mixin.apiPath + "/" + this.endpoint;
  url = mixin.commonParams(url, options);
  this.client.get(url, {}, callback);
};
Generic.prototype.get = function (options, callback) {
  mixin.validate.existence(options, 'id');
  var url = mixin.apiPath + '/' + this.endpoint + '/' + options.id;
  url = mixin.commonParams(url, options);
  this.client.get(url, {}, callback);
};
Generic.prototype.create = function (options, callback) {
  var url = mixin.apiPath + '/' + this.endpoint;
  url = mixin.commonParams(url, options);
  this.client.post(url, {}, callback);
};
Generic.prototype.update = function (options, callback) {
  mixin.validate.existence(options, 'id');
  var url = mixin.apiPath + '/' + this.endpoint + '/' + options.id;
  url = mixin.commonParams(url, options);
  this.client.put(url, {}, callback);
};
Generic.prototype.delete = function (options, callback) {
  mixin.validate.existence(options, 'id');
  var url = mixin.apiPath + '/' + this.endpoint + '/' + options.id;
  this.client.delete(url, {}, callback);
};
