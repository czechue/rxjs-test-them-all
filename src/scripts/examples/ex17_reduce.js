// Exercise 17: Retrieve the largest rating.
// Let's use our new reduce function to isolate the largest value in an array of ratings.
//
// function() {
//   var ratings = [2,3,1,4,5];

// You should return an array containing only the largest rating. Remember that reduce always
// returns an array with one item.
//   return ratings.
//   reduce(function(acc,curr){
//     if (curr > acc) {
//       acc = curr;
//     }
//     return curr;
//   })
// }


// 18 Exercise 18: Retrieve url of the largest boxart
// Let's try combining reduce() with map() to reduce multiple boxart objects to a single value: the url of the largest box art.

// function() {
//   var boxarts = [
//     { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
//     { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
//     { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
//     { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
//   ];
//
//   return boxarts.
//   reduce(function(acc,curr) {
//     if (acc.width * acc.height > curr.width * curr.height) {
//       return acc;
//     }
//     else {
//       return curr;
//     }
//   }).
//   map(function(boxart) {
//     return boxart.url;
//   });
// }

// Exercise 19: Reducing with an initial value
// Sometimes when we reduce an array, we want the reduced value to be a different type than the items stored in the array. Let's say we have an array of videos and we want to reduce them to a single map where the key is the video id and the value is the video's title.

// function() {
//   var videos = [
//     {
//       "id": 65432445,
//       "title": "The Chamber"
//     },
//     {
//       "id": 675465,
//       "title": "Fracture"
//     },
//     {
//       "id": 70111470,
//       "title": "Die Hard"
//     },
//     {
//       "id": 654356453,
//       "title": "Bad Boys"
//     }
//   ];
//
//   // Expecting this output...
//   // [
//   //	 {
//   //		 "65432445": "The Chamber",
//   //		 "675465": "Fracture",
//   //		 "70111470": "Die Hard",
//   //		 "654356453": "Bad Boys"
//   //	 }
//   // ]
//   return videos.
//   reduce(function(accumulatedMap, video) {
//       var obj = {};
//
//       // ----- INSERT CODE TO ADD THE VIDEO TITLE TO THE ----
//       // ----- NEW MAP USING THE VIDEO ID AS THE KEY	 ----
//
//       // Object.assign() takes all of the enumerable properties from
//       // the object listed in its second argument (obj) and assigns them
//       // to the object listed in its first argument (accumulatedMap).
//       return Object.assign(accumulatedMap, obj);
//     },
//     // Use an empty map as the initial value instead of the first item in
//     // the list.
//     {});
// }

