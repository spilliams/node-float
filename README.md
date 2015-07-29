# Float Scheduler

A Node module for interacting with [Float Scheduler's API](https://github.com/floatschedule/api).

[![NPM](https://nodei.co/npm/float-scheduler.png)](https://nodei.co/npm/float-scheduler/)

## Installation

    npm install float-scheduler
    
## Usage

    var Float = require('float-scheduler');
    var float = new Float({token: "my-float-api-token", user_agent: "My App <contact@myapp.com>"});

You must pass in a `token` and `user_agent` when constructing a Float object.

You get your token from the Float dashboard (of an administrator).

The user-agent string is for Float to identify who to contact in case of questions or concerns.

You may pass in a `debug` parameter as well, to get more console output.

## Endpoints

Endpoints are each set up to take a parameters object and a callback. Unless otherwise noted, the callback will provide an error object and a data object.

For example:

    float.People.list({}, function(err, data) {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        console.log(data);
    });

For more detail on specific endpoints and parameters, check out the [wiki page](https://github.com/spilliams/node-float/wiki/Endpoints).

## Other Stuff

- Implementation mimics that of [harvest](https://github.com/log0ymxm/node-harvest).
- Published to [npm](https://www.npmjs.com/package/float-scheduler) under the ISC license
- see [Changelog](https://github.com/spilliams/node-float/wiki/Changelog) for versioning information.
- Does your app use this module? Let me know!
- Problem with this module? Submit an [Issue](https://github.com/spilliams/node-float/issues) or a [Pull Request](https://github.com/spilliams/node-float/pulls).
