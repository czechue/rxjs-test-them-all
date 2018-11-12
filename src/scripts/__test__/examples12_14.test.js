import '../examples/implementation';
import { movieLists2 } from '../mocks/data';

describe('ex12 Retrieve id, title, and a 150x200 box art url for every video', () => {
  // Use one or more map, concatAll, and filter calls to create an array with the following items
  const expected = [
    {
      id: 70111470,
      title: 'Die Hard',
      boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
    },
    {
      id: 654356453,
      title: 'Bad Boys',
      boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg',
    },
    {
      id: 65432445,
      title: 'The Chamber',
      boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg',
    },
    {
      id: 675465,
      title: 'Fracture',
      boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
    },
  ];

  test('ex12 - retrive deeply nested data with map() concatAll()', () => {
    const result = movieLists2
      .myMap((movieListItem) => {
        return movieListItem.videos
          .myMap((video) => {
            return video.boxarts
              .myFilter((boxart) => {
                return boxart.width === 150;
              })
              .myMap((boxart) => {
                return {
                  id: video.id,
                  title: video.title,
                  boxart: boxart.url,
                };
              });
          })
          .concatAll();
      })
      .concatAll();

    expect(result).toEqual(expected);
  });

  test('ex14 - retrive deeply nested data with concatMap()', () => {
    const result2 = movieLists2
      .concatMap((movieListItem) => {
        return movieListItem.videos
          .concatMap((video) => {
            return video.boxarts
              .myFilter((boxart) => {
                return boxart.width === 150;
              })
              .myMap((boxart) => {
                return {
                  id: video.id,
                  title: video.title,
                  boxart: boxart.url,
                };
              });
          });
      });

    expect(result2).toEqual(expected);
  });
});
