var People, _isUndefined = require('../mixin');

module.exports = People = function (api) {
    this.api = api;
    this.client = api.client;
};

People.prototype.list = function (options, callback) {
    var url = "/people";
    this.client.get(url, {}, callback);
}

People.prototype.get = function(options, callback) {
    if (_isUndefined(options, 'id')) {
        return callback(new Error('Provide an id in the options object'));
    }
    
    var url = '/people/' + options.id;
    this.client.get(url, {}, callback);
};