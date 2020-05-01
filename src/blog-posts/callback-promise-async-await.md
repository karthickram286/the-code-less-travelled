---
title: 'Callbacks, Promise and Async/Await in Javascript'
date: '2019-12-25'
tags: ['javascript', 'callback', 'promise', 'async/await', 'non-blocking', 'asynchronous']
---

Javascript always runs the code in a non-blocking way. We'll see what I mean by that in this post. Since I come from a Java background, to check the flow of a particular operation, I code in the following manner.

```java
System.out.println("Started");
    // Some operation which takes some time
    System.out.println("Operation output");
System.out.println("Ended");
```

The output of the above snippet looked something like this.

```
Started
Operation output
Ended
```

When I started to follow this same habit while coding in JavaScript things didn't happen as I expected. When I had to debug a database call that was failing some reason, I followed the same procedure.

```javascript
console.log('Started');
    // Some DB call
    console.log('DB call result');
console.log('Ended');
```

To my surprise, the output looked like this!!

```
Started
Ended
DB call result
```
<center>
    <img align="center" src="https://media.giphy.com/media/RkzMtKbCKFUY3wYRMy/giphy.gif">
</center>

The **Ended** message was logged before the DB call. This happens because JavaScript executes everything in a non-blocking way. The Event loop of the JavaScript engine first logged the **Started** message, then it tried to execute the DB call. Since it takes some time the DB call was injected to the queue and the **Ended** message was logged. After the DB call executed the result was logged.

If the logged message uses a value that depends on a DB call, then the value will be ***undefined***. That's not a big surprise, right?

So how to solve this problem? Luckily JavaScript has solutions that can help us get some peace of mind.

---

##Callbacks

Callbacks are functions that are used to notify the calling instance when an asynchronous code block has been executed and the result is available. Let's look at an example...

```javascript
function timeConsuming(variable, callback) {
    // Some operation using that variable
    callback();
}

timeConsuming(variable, function() {
    console.log('Time consuming function ended');
});
```

Here, the function which is passed as a second parameter to the *timeConsuming* function is a callback function. Notice that the callback function is called inside the *timeConsuming* function after it executes the operation. The log *Time consuming function ended* will be logged after the operation executes.

---

##Promises

The Promise is a built-in language feature to handle asynchronous operations in JavaScript. Promises can help in handling multiple asynchronous operations easily and also provide error handling which is not present in Callbacks.

To understand the need for Promises in JavaScript we must first know the problem of *Callback Hell*.

###Callback Hell
In JavaScript, we can write anonymous callback functions with named function variables. Take a look at the following example,

```javascript
timeConsumingOne(a, function() {
    timeConsumingTwo(b, function() {
        timeConsumingThree(c, function() {
            // Nested callback function
        });
    });
});
```

Can you see it? A callback function calling another function that accepts a callback function as a parameter. The cycle continues and we have nested callbacks. This scenario of multiple callback functions leads to confusing and unmanageable code is called *Callback hell*. 

To solve this problem JavaScript introduced Promises. A Promise accepts a function that has only two callback parameters, *resolve* and *reject*. If an operation executes as expected the resolve() function will be called, else the reject() method will be called. It's as simple as that. Let's look at an example,

```javascript
const timeConsuming = () => {
    return new Promise((resolve, reject) => {
        let status = // Status of the operation (either true or false)
        if (status)
            resolve();
        else 
            reject();
    });
}

// Calling the function
timeConsuming
    .then(() => {
        console.log('Operation success');
    })
    .catch(() => {
        console.log('Error: Operation failed');
    });
```

Here, the *then()* method will be fired if the operation executed successfully, else the error will be catched in the *catch()* block. Writing asynchronous code with Promises will be much easier to manage and read than callbacks.

---

##Async/Await

Okay, now we have improved the readability and avoided confusion in our JavaScript code using Promises. But still, for more complex operations even the Promises are going to be a little fuzzy right? Is it possible to avoid writing chained promises? How awesome would it be if we can just tell JavaScript to just wait till an operation executes and then execute the following statements? Well, **Async/Await** feature was introduced just for that. 

<center>
    <img align="center" src="https://media.giphy.com/media/l1J9N8zrmYCfSrQFq/giphy.gif">
</center>

We are still going to use Promises but just in a different manner. It's more like a syntactical sugar for handling Promises. We can rewrite the same function using async/await like this,

```javascript
async function() {
    try {
        const result = await timeConsuming();
    } catch (err) {
        console.log('Error: ' + err.message);
    }
}
```

You can look that the implementation has changed a little bit. The *await* keyword is used to assure that the next line of code will be executed only after the promise is returned. To use the await keyword the function should be an *async* function. We also use a try/catch block to catch the errors from the promise.

