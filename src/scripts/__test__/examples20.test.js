import '../examples/implementation';
import { movieList3 } from '../mocks/data';

describe('Reduce c.d.', () => {
  test('ex20 - retrive the id, title, and smallest box', () => {
    const expected = [
      {
        boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
        id: 70111470,
        title: 'Die Hard',
      },
      {
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
        id: 654356453,
        title: 'Bad Boys',
      },
      {
        boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
        id: 65432445,
        title: 'The Chamber',
      },
      {
        boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
        id: 675465,
        title: 'Fracture',
      },
    ];

    const result = movieList3.concatMap(movieList => {
      return movieList.videos.concatMap(video => {
        return video.boxarts
          .myReduce((acc, curr) => {
            if (acc.width * acc.height < curr.width * curr.height) {
              return acc.url;
            } else {
              return curr.url;
            }
          })
          .map(boxartUrl => {
            return {
              id: video.id,
              title: video.title,
              boxart: boxartUrl,
            };
          });
      });
    });

    expect(result).toEqual(expected);
  });
});
