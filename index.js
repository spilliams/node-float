var restler = require('restler'),
    querystring = require('querystring'),
    mixin = require('./lib/mixin');

module.exports = function (opts) {
  var self = this;
  
  if (mixin.isUndefined(opts, 'token')) {
    throw new Error('Please pass an API token in the opts object');
  }
  if (mixin.isUndefined(opts, 'user_agent')) {
    throw new Error('Please pass a user_agent in the opts object');
  }
  
  this.token = opts.token;
  this.user_agent = opts.user_agent;
  this.debug = opts.debug || false;
  this.log_requests = opts.log_requests || this.debug;
  
  var restService = restler.service(function (token) {
    this.defaults.token = token;
  }, {
    baseURL: "https://api.floatschedule.com"
  }, {
    run: function (type, url, data) {
      if (self.log_requests) {
        console.log(mixin.logTimeStamp() + ' [float-scheduler] ' + type.toUpperCase() + ' ' + url);
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
  
  var Generic = require('./lib/generic');
  this.Projects = new Generic(this, "projects");
  this.Clients = new Generic(this, "clients");
  this.Departments = new Generic(this, "departments");
  this.People = new Generic(this, "people");
  this.Tasks = new Generic(this, "tasks");
  this.Holidays = new Generic(this, "holidays");
  this.Milestones = new Generic(this, "milestones");
  
  return this;
};
