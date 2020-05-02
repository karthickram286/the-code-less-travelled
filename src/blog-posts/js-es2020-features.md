---
title: 'ES2020 features in JavaScript'
date: '2020-05-01'
tags: ['javascript', 'es2020', 'bigint', 'promise']
---

TC39 is a committee that gives out specifications and standardizations for Javascript. Almost every year they roll out new changes to the ECMAScript, which was
suggested by its members in the form of proposals. The recent ECMAScript specification is ES2020 and we'll look into some important changes.

---

##1. BigInt

If you remember the Gangnam Style youtube counter incident you're awesome. If not you can check it out <a href="https://www.bbc.com/news/world-asia-30288542">here</a>. It basically forced youtube to upgrade its counter from 32-bit integer to 64-bit because, at the time of developing it,
nobody imagined that a video could be watched over 2 billion times. A 64-bit integer is ridiculously huge but we never know when that number will be exploited.

Javascript has a max integer limit of (2^53 - 1) which is huge(9007199253740992 to be precise), but BigInt helps you to go beyond that.  BigInt can't be matched with normal integers and it will throw an error if you try that. To declare a BigIntyou need to append **'n'** at the end of the number. 
The **'n'** at the end helps the Javascript engine to treat that number as a Big Integer. You can do some unimaginable operations using BigInt. Something like this,

```javascript
let n1 = 345734095834958340583409583490543n
let n2 = 457309583495083450934859043853095839058340583045834n
console.log(n1 + n2);                   // 457309583495083451280593139688054179641750166536377n
console.log(n1 * n2);                   // 158107515366334064826385465466257091931204935532234894557702484961502448456274547862n
```

You can try various operations like **+, -, *, %** with BigInt.
To display this huge number without the **'n'**  at the end, you can use the toString() method of BigInt.

```javascript
let n1 = 457309583495083451280593139688054179641750166536377n;
console.log(n1.toString());             // 457309583495083451280593139688054179641750166536377
```

Well, we can leave some heavy calculations to the Javascript engine now.

<center>
    <img align="center" src="https://media.giphy.com/media/RJh92v4Y1jcsInxWxR/giphy.gif">
</center>

---

##2. Promise.allSettled

Currently, if we want to use multiple promises simultaneously, we can use the **Promise.all()** function which combines the results of multiple promises and 
returns them in order.

```javascript
let multiplePromises = [
  Promise.resolve('a');
  Promise.resolve(2);
  Promise.resolve(true);
];

Promise.all(multiplePromises)
  .then(responses => {
    console.log(response)           // ['a', 2, true]
  })
  .catch(e => {
    console.log(e);
  });
```

The above code uses **Promise.all()** which executes all the promises in order and basically returns an array of responses that got resolved. The only
downside of using **Promise.all()** is that even if one of our promises gets rejected, other resolved responses won't be returned. It will only return 
the rejected response instead of returning the combined results.

```javascript
let multiplePromises = [
  Promise.resolve('a');
  Promise.reject('error');
  Promise.resolve(true);
];

Promise.all(multiplePromises)
  .then(responses => {
    console.log(response)           
  })
  .catch(e => {
    console.log(e);               // "error"
  });
```

The proposed **Promise.allSettled** method tries to fix the above problem by returning all the responses. It returns responses of all the settled promises
either resolved or rejected.

```javascript
let multiplePromises = [
  Promise.resolve('a');
  Promise.reject('error');
  Promise.resolve(true);
];

Promise.allSettled(multiplePromises)
  .then(response => {
    console.log(response)       // 'a', 'error', true
  });
```

It's like basically saying to the Javascript Engine, *"Just give me the damn responses, I don't care about the results"*.

**NOTE**: Libraries like bluebird.js already have a similar implementation of *Promise.allSettled()*.

<center>
    <img align="center" src="https://media.giphy.com/media/YQNddm1UAzwGI8sR6c/giphy.gif">
</center>

---

##3. globalThis

In almost all languages there'll be one big context object that contains everything. In Javascript, this big context object differs from 
one environment to another. In browsers, this is called **window**, in node.js runtime, it is called **global** and in web workers, it is called **self**.
If there comes a new runtime in the future, we may have to use something like **me**(oh wait, some of us are already using it). We simply can't use
one context in other environments and this led to a lot of confusion. So ES2020, introduces this **globalThis** which is one super context object.

We can now refer **globalThis** object without caring about which runtime we are currently using.

<center>
    <img align="center" src="https://media.giphy.com/media/lnCDdnuRwFNVXk8dLr/giphy.gif">
</center>

---

##4. Optional Chaining

Let's take a look at the following example,

```javascript
let players = {
  player1: {
    name: "Chris",
    age: 26,
    team: {
      city: "NewYork",
      position: "Centre back"
    }
  }
}

console.log(players.player2.team.city);       // Uncaught TypeError: Cannot read property 'team' of undefined
```

A TypeError is thrown here because we don't have a *player2* in the players object. In order to overcome this, we can check whether a **player2** exists
in the object. But things can get complicated if we have deeply nested objects. 

If you use the *lodash* library, the **_.get()** method will help as it handles all the errors for you. It'll just return *undefined* without
throwing an error.

Optional chaining allows us to access deeply nested objects without worrying about whether the property exists or not. If the value exists, it will 
be returned, If not **undefined** will be returned. Instead of accessing the child properties with a **. (dot)** we can use **(?.)** to use optional chaining.

```javascript
let players = {
  player1: {
    name: "Chris",
    age: 26,
    team: {
      city: "NewYork",
      position: "Centre back"
    }
  }
}

console.log(players?.player2?.team?.city);           // undefined
console.log(players?.player1?.team?.address);        // undefined
```

At least, we don't have to deal with this Uncaught TypeError anymore.

<center>
    <img align="center" src="https://media.giphy.com/media/l2JdVVpB1NSM7mnss/giphy.gif">
</center>

---

##5. Dynamic Imports

Now, we can improve the performance of our applications by dynamically importing modules. We don't have to import every single module at the
beginning of the file. Instead, we can just dynamically import the modules, only when it's necessary.

Before,

```javascript
import { someFunction } from './someModule';
import { anotherFunction } from './anotherModule';

if (user.makesAction) {
  someFunction.execute();
}
anotherFunction.execute();
```

Now with Dynamic imports,

```javascript
import { anotherFunction } from './anotherModule';

if (user.makesAction) {
  const { someFunction } = await import('./someModule'); 
  someFunction.execute();
}
anotherFunction.execute();
```

If you look at this, the module *someModule* will only load during runtime and only if that condition is passed. This will help us in improving the 
overall performance of our applications.

<center>
    <img align="center" src="https://media.giphy.com/media/2HONNTJbRhzKE/giphy.gif">
</center>

source: https://github.com/tc39/proposals/blob/master/finished-proposals.md