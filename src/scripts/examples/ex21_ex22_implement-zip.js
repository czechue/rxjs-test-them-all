// Example ex 21
// function() {
//   var videos = [
//       {
//         "id": 70111470,
//         "title": "Die Hard",
//         "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
//         "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
//         "rating": 4.0,
//       },
//       {
//         "id": 654356453,
//         "title": "Bad Boys",
//         "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
//         "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
//         "rating": 5.0,
//       },
//       {
//         "id": 65432445,
//         "title": "The Chamber",
//         "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
//         "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
//         "rating": 4.0,
//       },
//       {
//         "id": 675465,
//         "title": "Fracture",
//         "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
//         "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
//         "rating": 5.0,
//       }
//     ],
//     bookmarks = [
//       {id: 470, time: 23432},
//       {id: 453, time: 234324},
//       {id: 445, time: 987834}
//     ],
//     counter,
//     videoIdAndBookmarkIdPairs = [];
//
//   for(i = 0; i < Math.min(videos.length, bookmarks.length); i++) {
//     // Insert code here to create a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
//     videoIdAndBookmarkIdPairs.push({videoId: videos[i].id, bookmarkId: bookmarks[i].id})
//   }
//
//   return videoIdAndBookmarkIdPairs;
// }

// Let's add a static zip() function to the Array type.
// The zip function accepts a combiner function,
// traverses each array at the same time, and calls the combiner
// function on the current item on the left-hand-side and
// right-hand-side. The zip function requires an item from each
// array in order to call the combiner function,
// therefore the array returned by zip will only be as large as
// the smallest input array.

// JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]'

Array.zip = function(left, right, combinerFunction) {
  var counter,
    results = [];

  for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(combinerFunction(left[counter], right[counter]))
  }

  return results;
};
