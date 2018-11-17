import '../examples/implementation';

var videos = [
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: 4.0,
  },
  {
    id: 654356453,
    title: 'Bad Boys',
    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: 5.0,
  },
  {
    id: 65432445,
    title: 'The Chamber',
    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: 4.0,
  },
  {
    id: 675465,
    title: 'Fracture',
    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: 5.0,
  },
];
const bookmarks = [{ id: 470, time: 23432 }, { id: 453, time: 234324 }, { id: 445, time: 987834 }];

describe('ex21 - Zip implementation', () => {
  test('Zip', () => {
    const expected = [
      { videoId: 70111470, bookmarkId: 470 },
      { videoId: 654356453, bookmarkId: 453 },
      { videoId: 65432445, bookmarkId: 445 },
    ];
    const result = Array.zip(videos, bookmarks, (v, b) => {
      return { videoId: v.id, bookmarkId: b.id };
    });
    expect(result).toEqual(expected);
  });
});
