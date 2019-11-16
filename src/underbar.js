(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n===0){
      return []
    }
    if (n > array.length){
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if it is an array:
    if (Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    // if it is an object:
    if (!Array.isArray(collection) && typeof collection === 'object'){
      for (var key in collection){
        iterator(collection[key], key, collection)
      }
    }
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // create a result array
    var res = [];
    _.each(collection, function(item){
      if (test(item)===true){
        res.push(item);
      }
    })
    return res;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(element){
      return !test(element);
    })
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var tempObj = {};
    var res = [];
    _.each(array, function(item){
      tempObj[item] = item;
    })
    _.each(tempObj, function(item, key){
      res.push(item);
    })
    return res;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var res = [];
    _.each(collection, function(item, index, col){
      res.push(iterator(item));
    })
    return res;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //set accumulator and reset collection if accumulator in args
    if (arguments.length < 3){
      accumulator = collection[0];
      collection = collection.slice(1);
    }
    //iterate on the collection
    _.each(collection, function(item){
      accumulator = iterator(accumulator, item)
    })
    return accumulator;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    if (collection.length === 0) {
      return true;
    }
    return _.reduce(collection, function(status, item){
      if (!status) {
        return false;
      }
      return Boolean(iterator(item));
      }, true);
    };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function(test, item) {
      return test || iterator(item);
    }, false)
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(destination, source) {
    var sources = Array.from(arguments).slice(1)
    _.each(sources, function(obj, index, col){
      _.each(obj, function(item, key, obj){
        destination[key] = item;
      })
    });
    return destination;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(destination, source) {
    var sources = Array.from(arguments).slice(1);
    _.each(sources, function(obj, index, col){
      _.each(obj, function(item, key, obj){
        if(destination[key]===undefined){
          destination[key] = item;
        }
      })
    })
    return destination;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    return function() {
      var arg = JSON.stringify(arguments);
      if (!memo[arg]) {
        memo[arg] = func.apply(this, arguments);
      }
      return memo[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.from(arguments).slice(2);
    setTimeout(function(){
      func.apply(this, args)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled = [];
    var arrayCopy = Array.prototype.slice.call(array);
    var results = [];
    for (var i = 0; i < array.length; i++) {
      var random = Math.floor(Math.random() * arrayCopy.length);
    results.push(arrayCopy[random]);
    arrayCopy.splice(random,1);
    }
    return results;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var res = _.map(collection, function(item){
      if (typeof functionOrKey === 'function'){
        return functionOrKey.apply(item, args)
      }
      else {
        return item[functionOrKey].apply(item, args)
      }
    })
    return res;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // if iterator is a string, use it to access the property of each item in the collection
    if (typeof iterator==='string') {
      return collection.sort(function(a, b) {
        if (a[iterator]===undefined) {
          return 1;
        } else {
          return (a[iterator]-b[iterator]);
        }
      });
    } else { // else, treat iterator as a function
      var iterated=[];
      var newCollection=[]; //final collection to return
      //call the function on each item in the collection
      _.each(collection, function(val) {
        iterated.push([iterator(val), val]);
      });
      // sort the iterated array by the return value from iterator function
      iterated.sort(function(a, b) {
        if (a[0] !== b[0]) {
          if (a[0] < b[0] || b[0] === undefined) return -1;
          if (a[0] > b[0] || a[0] === undefined) return 1;
        }
      });
      // push each value from the iterated array to a new collection
      _.each(iterated, function(val) {
        newCollection.push(val[1]);
      });
      return newCollection;
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  // _.zip = function() {
  //   // fing arg length
  //   var argArray = Array.from(arguments)
  //   // find maximum item length
  //   var maxColLength = _.reduce(argArray, function(memo, next){
  //     if (next.length > memo.length){
  //       return next;
  //     }
  //     return memo;
  //   }).length;
  //   // create matrix to push to
  //   var mat = [];
  //   for (var i = 0; i < argArray.length; i++){
  //     mat.push(new Array(maxColLength).fill(undefined))
  //   }
  //   // with a nested loop, iterate across argArray and with [i] and [j] and switch [j] for [i] and vis versa
  //   for (var i = 0; i<argArray.length; i++){
  //     var array = argArray[i]
  //     for (var j = 0; j < array.length; j++){
  //       mat[j][i]= argArray[i][j]
  //     }
  //   }
  //   return mat;
  // };

  //improve the above by using _.pluck
  _.zip = function() {
    var output = [];
    for (var index = 0; index < arguments.length; index++) {
      output[index] = _.pluck(arguments, index);
    }
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray) {
    // in order to use Array.concat, convert all primatives to an array containing that primative
    if (!Array.isArray(nestedArray)){
      return [nestedArray];
    };
    var array = [];
    //iterate on each item in the array
    for (var i = 0; i < nestedArray.length; i++){
      array = array.concat(_.flatten(nestedArray[i]))
    }
    return array;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var common = [];
    var numArrays = arguments.length;
    var firstArray = arguments[0];
    for (var i = 0; i < firstArray.length; i++) {
      var item = firstArray[i];
      if (_.contains(common, item)) {
        continue;
      }
      for (var j = 1; j < numArrays; j++) {
        if (!_.contains(arguments[j], item)) {
          break;
        }
      }
      if (j === numArrays) {
        common.push(item);
      }
    }
    return common;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = arguments;
    var tempObj = {}, res = []
    _.each(args, function(lst){
      _.each(lst, function(item){
        if (tempObj[item] === undefined){
          tempObj[item] = 1;
        } else {
          tempObj[item] += 1;
        }
      })
    })
    _.each(tempObj, function(item, key){
      if (tempObj[key] === 1 && _.contains(array, +key)){
        res.push(+key)
      }
    })
    return res;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
      previous = 0;
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) {
        context = null
        args = null;
      }
    };

    var throttled = function() {
      context = this;
      args = arguments;
      var now = Date.now();
      if (!previous) {
        previous = now;
      }
      var remaining = wait - (now - previous);
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    return throttled;
  };

}());
