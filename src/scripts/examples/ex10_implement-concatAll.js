//
// Exercise 10: Implement concatAll()
// Let's add a concatAll() function to the Array type.
// The concatAll() function iterates over each sub-array in the array
// and collects the results in a new, flat array.
// Notice that the concatAll() function expects each item in the array
// to be another array.

Array.prototype.concatAll = function() {
  var results = [];
  this.forEach(function(subArray) {
    return subArray.forEach(function (item) {
      return results.push(item)
    })
  });

  return results;
};
