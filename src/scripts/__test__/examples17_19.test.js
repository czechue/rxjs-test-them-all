import '../examples/implementation';

describe('ex17+ reducing values', () => {
  test('ex17 Retrieve the largest rating.', () => {
    const ratings = [2, 3, 1, 4, 5];

    // You should return an array containing only the largest rating. Remember that reduce always
    // returns an array with one item.
    const result = ratings.myReduce((acc, curr) => {
      if (acc > curr) {
        return acc;
      }
      return curr;
    });

    expect(result).toEqual([5]);
  });

  test('ex18 - retrive url of the largest boxart', () => {
    const boxarts = [
      { width: 200, height: 200, url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg' },
      { width: 150, height: 200, url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' },
      { width: 300, height: 200, url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg' },
      { width: 425, height: 150, url: 'http://cdn-0.nflximg.com/images/2891/Fracture425.jpg' },
    ];

    const result = boxarts
      .myReduce((acc, curr) => {
        if (acc.width * acc.height > curr.width * curr.height) {
          return acc;
        }
        return curr;
      })
      .myMap(boxart => boxart.url);

    expect(result).toEqual(['http://cdn-0.nflximg.com/images/2891/Fracture425.jpg']);
  });

  test('ex19 - Reducing with an initial value', () => {
    const videos = [
      {
        id: 65432445,
        title: 'The Chamber',
      },
      {
        id: 675465,
        title: 'Fracture',
      },
      {
        id: 70111470,
        title: 'Die Hard',
      },
      {
        id: 654356453,
        title: 'Bad Boys',
      },
    ];

    const expected = [
      {
        65432445: 'The Chamber',
        675465: 'Fracture',
        70111470: 'Die Hard',
        654356453: 'Bad Boys',
      },
    ];
    const result = videos.myReduce((accumulatedMap, video) => {
      const obj = {};
      obj[video.id] = video.title;

      return Object.assign(accumulatedMap, obj);
    }, {});

    expect(result).toEqual(expected);
  });
});
