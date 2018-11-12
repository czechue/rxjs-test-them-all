// Exercise 7: Implement filter()
// To make filtering easier, let's add a filter()
// function to the Array type.
// The filter() function accepts a predicate.
// A predicate is a function that accepts an item in the array,
// and returns a boolean indicating whether the item
// should be retained in the new array.

Array.prototype.myFilter = function(predicateFunction) {
  const result = [];
  this.forEach(function(arrayItem) {
    if (predicateFunction(arrayItem)) {
      result.push(arrayItem);
    }
  });

  return result;
};
