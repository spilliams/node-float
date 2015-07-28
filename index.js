var restler = require('restler'),
    querystring = require('querystring'),
    _isUndefined = require('./mixin'),
    Float;

module.exports = Float = function (opts) {
    var self = this;
    
    if (_isUndefined(opts, 'token')) {
        throw new Error('Please pass an API token in the opts object');
    }
    if (_isUndefined(opts, 'user_agent')) {
        throw new Error('Please pass a user_agent in the opts object');
    }
    
    this.token = opts.token;
    this.user_agent = opts.user_agent;
    this.debug = opts.debug || true;
    
    var restService = restler.service(function (token) {
        if (self.debug) {
            console.log("constructor? token "+token);
        }
        this.defaults.token = token;
    }, {
        baseURL: "https://api.floatschedule.com/api/v1"
    }, {
        run: function (type, url, data) {
            if (self.debug) {
                console.log('run', type, url, data);
            }
            
            var opts = {};
            opts.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': self.user_agent
            }
            opts.accessToken = self.token;
            
            if (typeof data !== 'undefined') {
                if (typeof data === 'object') {
                    opts.headers['Content-Length'] = querystring.stringify(data).length;
                } else {
                    opts.headers['Content-Length'] = data.length;
                }
            } else {
                opts.headers['Content-Length'] = 0;
            }
            
            opts.data = data;
            
            if (self.debug) {
                console.log(opts);
            }
            
            switch (type) {
            case 'get':
                return this.get(url, opts);
            case 'post':
                return this.post(url, opts);
            case 'put':
                return this.put(url, opts);
            case 'delete':
                return this.del(url, opts);
            }
            return this;
        }
    });
    
    this.processRequest = function (res, callback) {
        if (typeof callback !== "function") {
            throw new Error('processRequest: Callback is not defined');
        }
        
        res.once('complete', function(data, res) {
            var err = null;
            
            if (res.req.method === "DELETE" && res.statusCode) {
                return callback(err, data);
            }
            
            if (res.statusCode > 399 || data instanceof Error || data === "Authentication failed for API request.") {
                err = data;
                data = {};
            }
            
            callback(err, data);
        });
    };
    
    this.service = new restService(this.token);
    
    this.client = {
        get: function (url, data, callback) {
            self.processRequest(self.service.run('get', url, data), callback);
        },
        patch: function (url, data, callback) {
            self.processRequest(self.service.run('patch', url, data), callback);
        },
        post: function (url, data, callback) {
            self.processRequest(self.service.run('post', url, data), callback);
        },
        put: function (url, data, callback) {
            self.processRequest(self.service.run('put', url, data), callback);
        },
        delete: function (url, data, callback) {
            self.processRequest(self.service.run('delete', url, data), callback);
        }
    };
    
    var People = require('./lib/people');
    
    this.People = new People(this);
    
    return this;
};