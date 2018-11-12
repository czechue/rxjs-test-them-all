import './ex4_implement-map';
import './ex10_implement-concatAll';

Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
  return (
    this.myMap((item) => {
      // ------------   INSERT CODE HERE!  ----------------------------
      // Apply the projection function to each item. The projection
      // function will return a new child array. This will create a
      // two-dimensional array.
      // ------------   INSERT CODE HERE!  ----------------------------
      return projectionFunctionThatReturnsArray(item);
    })
      // apply the concatAll function to flatten the two-dimensional array
      .concatAll()
  );
};


