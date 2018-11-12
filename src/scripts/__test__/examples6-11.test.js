import '../examples/implementation'
import { movieLists, newReleases } from '../mocks/data';

describe('ex6 - ex10', () => {
  test('ex6 - filter using forEach', () => {
    const expected = [654356453, 675465];
    const videos = [];
    newReleases.forEach(video => {
      if (video.rating === 5.0) {
        videos.push(video.id);
      }
    });

    expect(videos).toEqual(expected);
  });

  test('ex7 & ex8 - implementing filter method and chain with map()', () => {
    const expected = [654356453, 675465];
    const videos = newReleases.myFilter(video => video.rating === 5.0).myMap(v => v.id);
    expect(videos).toEqual(expected);
  });

  test('ex9 - querying trees - flatting the movieList array into array of video ids', () => {
    const result = [];
    movieLists.forEach(movieListItem => {
      movieListItem.videos.forEach(video => {
        result.push(video.id);
      });
    });
    expect(result).toEqual([70111470, 654356453, 65432445, 675465]);
  });

  test('ex10 - implement concatAll()', () => {
    const input = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = input.concatAll();
    expect(result).toEqual(expectedOutput);
  });

  test('ex11 - Use map() and concatAll() to project and flatten the movieLists into an array of video ids', () => {
    const expectedIds = [70111470, 654356453, 65432445, 675465];
    const result = movieLists
      .myMap(movieListsItem => {
        return movieListsItem.videos.myMap(item => {
          return item.id;
        });
      })
      .concatAll();

    expect(result).toEqual(expectedIds);
  });
});
