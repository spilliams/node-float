# Float Scheduler

A Node module for interacting with Float Scheduler's API.

## Installation

    npm install float-scheduler
    
## Usage

    var Float = require('float-scheduler');
    var float = new Float({token: "my-float-api-token", user_agent: "My App <contact@myapp.com>"});

### Configuration

You must pass in a `token` and `user_agent` when constructing a Float object.

You get your token from the Float dashboard (of an administrator).

The user-agent string is for Float to identify who to contact in case of questions or concerns.

You may pass in a `debug` parameter as well.

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

Current endpoints are:

- People
    - list: takes no data, returns a list of people
    - get: takes an id, returns a person
