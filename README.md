# superior-handler 

A superior extension to handle express router and middleware.

# Installation

```
npm i superior-handler
```

## Routing using withHandler
```js
var router = require('express').Router();
var { withHandler, Success } = require('superior-handling');
var { getReq, postReq } = withHandler(router);

getReq('/', (req, done) => {
    // code
    done(Success());
});

module.exports = router;
```

### The routing functions

superior-handler provides routing functions for http methods.

* getReq
* postReq
* putReq

These functions takes three arguments: (path, [middlewares], route function)

Route function has two parameters: (request, done)
The route function body can be written without the try-catch blocks.

```js
getReq('/', validationMiddleware, (req, done) => {
    // no need to enlose code in try catch
    done(Success());
    
    // response: 
    { 
        "message" : 
        "ok" 
    }
});

module.exports = router;
```

### The done function

done function takes only one argument. They are predefined responses provided with the package

```js
    done(Success());
    // response: 
    {
        "message": "ok"
    }
```

### Response functions

superior-handler provides a bunch of predifined functions to send responses in an easy and consitent json structure.

__Success functions__
* Success

__Error functions__
* ServerError
* BadRequest
* Unauthorized
* Forbidden
* NotFound

These functions can take two parameters. A string for response message and a string/object for response data/error;

```js
    // no parameter passed to response function
    done(Success()); 
    // response: 
    {
        "message": "ok"
    }

    // passing string to response function
    done(Success('success')); 
    // response: 
    {
        "message": "success"
    }

    // passing a string and an object to response function
    done(Success('success', { foo: "bar" })); 
     // response: 
    {
        "message": "success", 
        "data": {
            "foo": "bar"
        }
    }

    // passing an object to response function
    done(Success({ foo: "bar" }));
    // response: 
    {
        "data": {
            "foo": "bar"
        }
    }

    // Error functions behave as the same.
    // no parameter passed to response function
    done(ServerError()); 
    // response: 
    {
        "message": "Server Error"
    }

    // Except the response key is "error" instead of "data"
    done(ServerError({ foo: "bar" }));
    // response: 
    {
        "error": {
            "foo": "bar"
        }
    }
```
