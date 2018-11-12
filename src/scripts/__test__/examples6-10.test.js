import '../examples/ex4_implement-map';
import newReleases from '../mocks/data';

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
});
