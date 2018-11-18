import '../examples/implementation';
import { movieLists4 } from '../mocks/data';

// This is a variation of the problem we solved earlier.
// This time each video has an interesting moments collection, each representing a
// time during which a screenshot is interesting or representative of the title as a whole.
// Notice that both the boxarts and interestingMoments arrays are located at the same
// depth in the tree. Retrieve the time of the middle interesting moment and the smallest
// box art url simultaneously with zip().
//
// Return an {id, title, time, url} object for
// each video.

test(
  "ex24 -  Retrieve each video's id, title, middle interesting moment time, " +
    'and smallest box art url.',
  () => {
    const expected = [
      {
        id: 70111470,
        title: 'Die Hard',
        time: 323133,
        url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
      },
      {
        id: 654356453,
        title: 'Bad Boys',
        time: 6575665,
        url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
      },
      {
        id: 65432445,
        title: 'The Chamber',
        time: 3452343,
        url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
      },
      {
        id: 675465,
        title: 'Fracture',
        time: 3453434,
        url: 'http://cdn-0.nflximg.com/images/2891/Fracture120.jpg',
      },
    ];

    const result = movieLists4.concatMap(movieList => {
      return movieList.videos.concatMap(video => {
        const interestingMoments = video.interestingMoments.myFilter(m => m.type === 'Middle');
        const boxartUrl = video.boxarts.myReduce((acc, curr) => {
          if (acc.width * acc.height < curr.width * curr.height) {
            return acc;
          }
          return curr;
        });

        return Array.zip(boxartUrl, interestingMoments, (boxart, moment) => {
          return {
            id: video.id,
            title: video.title,
            time: moment.time,
            url: boxart.url,
          };
        });
      });
    });

    expect(result).toEqual(expected);
  },
);
